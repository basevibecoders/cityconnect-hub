import React, { createContext, useContext, useState, useEffect } from "react";
import {
  municipalities as defaultMunicipalities,
  councillors as defaultCouncillors,
  wards as defaultWards,
  type Municipality,
  type Councillor,
  type Ward,
} from "@/data/civic-data";

export type UserRole = "public" | "councillor" | "admin";

interface CivicContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  activeCouncillorId: string;
  setActiveCouncillorId: (id: string) => void;
  municipalities: Municipality[];
  councillors: Councillor[];
  wards: Ward[];
  updateMunicipality: (code: string, updated: Partial<Municipality>) => void;
  updateCouncillor: (id: string, updated: Partial<Councillor>) => void;
  updateWard: (wardNumber: string, municipality: string, updated: Partial<Ward>) => void;
  canEditCouncillor: (councillorId: string) => boolean;
  canEditWard: (wardNumber: string, municipality: string) => boolean;
  canEditMunicipality: () => boolean;
  resetAllToDefault: () => void;
  // Modal controls
  editingCouncillor: Councillor | null;
  setEditingCouncillor: (c: Councillor | null) => void;
  editingWard: Ward | null;
  setEditingWard: (w: Ward | null) => void;
  editingMunicipality: Municipality | null;
  setEditingMunicipality: (m: Municipality | null) => void;
}

const CivicContext = createContext<CivicContextType | undefined>(undefined);

const STORAGE_KEYS = {
  ROLE: "civic_rewards_role_v1",
  COUNCILLOR_ID: "civic_rewards_councillor_id_v1",
  MUNICIPALITIES: "civic_rewards_municipalities_v1",
  COUNCILLORS: "civic_rewards_councillors_v1",
  WARDS: "civic_rewards_wards_v1",
};

export function CivicProvider({ children }: { children: React.ReactNode }) {
  const [role, setRoleState] = useState<UserRole>("admin"); // Default to admin for convenient preview testing
  const [activeCouncillorId, setActiveCouncillorIdState] = useState<string>("naledi-mokoena");

  const [municipalities, setMunicipalities] = useState<Municipality[]>(() => {
    if (typeof window === "undefined") return defaultMunicipalities;
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.MUNICIPALITIES);
      return saved ? JSON.parse(saved) : defaultMunicipalities;
    } catch {
      return defaultMunicipalities;
    }
  });

  const [councillors, setCouncillors] = useState<Councillor[]>(() => {
    if (typeof window === "undefined") return defaultCouncillors;
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.COUNCILLORS);
      return saved ? JSON.parse(saved) : defaultCouncillors;
    } catch {
      return defaultCouncillors;
    }
  });

  const [wards, setWards] = useState<Ward[]>(() => {
    if (typeof window === "undefined") return defaultWards;
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.WARDS);
      return saved ? JSON.parse(saved) : defaultWards;
    } catch {
      return defaultWards;
    }
  });

  // Modals state
  const [editingCouncillor, setEditingCouncillor] = useState<Councillor | null>(null);
  const [editingWard, setEditingWard] = useState<Ward | null>(null);
  const [editingMunicipality, setEditingMunicipality] = useState<Municipality | null>(null);

  useEffect(() => {
    try {
      const savedRole = localStorage.getItem(STORAGE_KEYS.ROLE) as UserRole | null;
      if (savedRole) setRoleState(savedRole);
      const savedCId = localStorage.getItem(STORAGE_KEYS.COUNCILLOR_ID);
      if (savedCId) setActiveCouncillorIdState(savedCId);
    } catch {
      // Ignore in SSR
    }
  }, []);

  const setRole = (newRole: UserRole) => {
    setRoleState(newRole);
    try {
      localStorage.setItem(STORAGE_KEYS.ROLE, newRole);
    } catch {}
  };

  const setActiveCouncillorId = (id: string) => {
    setActiveCouncillorIdState(id);
    try {
      localStorage.setItem(STORAGE_KEYS.COUNCILLOR_ID, id);
    } catch {}
  };

  const updateMunicipality = (code: string, updated: Partial<Municipality>) => {
    setMunicipalities((prev) => {
      const next = prev.map((m) => (m.code === code ? { ...m, ...updated } : m));
      try {
        localStorage.setItem(STORAGE_KEYS.MUNICIPALITIES, JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  const updateCouncillor = (id: string, updated: Partial<Councillor>) => {
    setCouncillors((prev) => {
      const next = prev.map((c) => (c.id === id ? { ...c, ...updated } : c));
      try {
        localStorage.setItem(STORAGE_KEYS.COUNCILLORS, JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  const updateWard = (wardNumber: string, municipality: string, updated: Partial<Ward>) => {
    setWards((prev) => {
      const next = prev.map((w) =>
        w.wardNumber === wardNumber && w.municipality === municipality ? { ...w, ...updated } : w,
      );
      try {
        localStorage.setItem(STORAGE_KEYS.WARDS, JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  const canEditCouncillor = (councillorId: string) => {
    if (role === "admin") return true;
    if (role === "councillor" && activeCouncillorId === councillorId) return true;
    return false;
  };

  const canEditWard = (wardNumber: string, _municipality: string) => {
    if (role === "admin") return true;
    if (role === "councillor") {
      const activeC = councillors.find((c) => c.id === activeCouncillorId);
      if (activeC && activeC.ward === wardNumber) return true;
    }
    return false;
  };

  const canEditMunicipality = () => {
    return role === "admin";
  };

  const resetAllToDefault = () => {
    setMunicipalities(defaultMunicipalities);
    setCouncillors(defaultCouncillors);
    setWards(defaultWards);
    try {
      localStorage.removeItem(STORAGE_KEYS.MUNICIPALITIES);
      localStorage.removeItem(STORAGE_KEYS.COUNCILLORS);
      localStorage.removeItem(STORAGE_KEYS.WARDS);
    } catch {}
  };

  return (
    <CivicContext.Provider
      value={{
        role,
        setRole,
        activeCouncillorId,
        setActiveCouncillorId,
        municipalities,
        councillors,
        wards,
        updateMunicipality,
        updateCouncillor,
        updateWard,
        canEditCouncillor,
        canEditWard,
        canEditMunicipality,
        resetAllToDefault,
        editingCouncillor,
        setEditingCouncillor,
        editingWard,
        setEditingWard,
        editingMunicipality,
        setEditingMunicipality,
      }}
    >
      {children}
    </CivicContext.Provider>
  );
}

export function useCivic() {
  const context = useContext(CivicContext);
  if (!context) {
    throw new Error("useCivic must be used within a CivicProvider");
  }
  return context;
}
