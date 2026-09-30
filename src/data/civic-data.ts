import nalediPortrait from "@/assets/councillor-naledi.jpg";
import thaboPortrait from "@/assets/councillor-thabo.jpg";
import zanelePortrait from "@/assets/councillor-zanele.jpg";

export interface Municipality {
  name: string;
  short: string;
  province: string;
  wards: number;
  category: "Metropolitan" | "Local";
  code: string;
  description: string;
  emblem: string;
  sealClass: string;
}

export interface Councillor {
  id: string;
  name: string;
  ward: string;
  municipality: string;
  areas: string;
  image: string;
  focus: string[];
  party: {
    name: string;
    initials: string;
    tone: string;
  };
  statement: string;
  commitments: number;
  activityScore: number;
  isMostActive: boolean;
  email: string;
  phone: string;
  officeHours: string;
}

export interface Ward {
  wardNumber: string;
  municipality: string;
  province: string;
  suburbs: string;
  councillorName: string;
  registeredVoters: number;
  activeProjects: number;
  keyPriorities: string[];
}

export const municipalities: Municipality[] = [
  {
    name: "City of Johannesburg",
    short: "Johannesburg",
    province: "Gauteng",
    wards: 135,
    category: "Metropolitan",
    code: "JHB",
    description:
      "South Africa's largest metropolitan hub and economic engine, comprising 7 administrative regions.",
    emblem: "JHB",
    sealClass: "bg-amber-500/20 text-amber-950 border-amber-500/40",
  },
  {
    name: "City of Cape Town",
    short: "Cape Town",
    province: "Western Cape",
    wards: 116,
    category: "Metropolitan",
    code: "CPT",
    description:
      "Coastal legislative capital and major tech/tourism hub across the Cape Peninsula and Helderberg.",
    emblem: "CPT",
    sealClass: "bg-blue-500/20 text-blue-950 border-blue-500/40",
  },
  {
    name: "eThekwini Metropolitan Municipality (Durban)",
    short: "eThekwini",
    province: "KwaZulu-Natal",
    wards: 111,
    category: "Metropolitan",
    code: "ETH",
    description:
      "The primary shipping and logistics port of sub-Saharan Africa with rich coastal communities.",
    emblem: "ETH",
    sealClass: "bg-teal-500/20 text-teal-950 border-teal-500/40",
  },
  {
    name: "City of Tshwane (Pretoria)",
    short: "Tshwane",
    province: "Gauteng",
    wards: 107,
    category: "Metropolitan",
    code: "TSH",
    description:
      "Administrative capital of South Africa, diplomatic center, and major academic and industrial corridor.",
    emblem: "TSH",
    sealClass: "bg-purple-500/20 text-purple-950 border-purple-500/40",
  },
  {
    name: "Ekurhuleni Metropolitan Municipality (East Rand)",
    short: "Ekurhuleni",
    province: "Gauteng",
    wards: 112,
    category: "Metropolitan",
    code: "EKU",
    description:
      "The manufacturing, freight, and aerospace hub of Gauteng surrounding OR Tambo International Airport.",
    emblem: "EKU",
    sealClass: "bg-sky-500/20 text-sky-950 border-sky-500/40",
  },
  {
    name: "Nelson Mandela Bay Metropolitan Municipality (Gqeberha)",
    short: "Nelson Mandela Bay",
    province: "Eastern Cape",
    wards: 60,
    category: "Metropolitan",
    code: "NMB",
    description:
      "Major automotive capital and seaport on the south-eastern coast spanning Gqeberha and Kariega.",
    emblem: "NMB",
    sealClass: "bg-indigo-500/20 text-indigo-950 border-indigo-500/40",
  },
  {
    name: "Buffalo City Metropolitan Municipality (East London)",
    short: "Buffalo City",
    province: "Eastern Cape",
    wards: 50,
    category: "Metropolitan",
    code: "BUF",
    description: "Eastern Cape industrial gateway connecting East London, Mdantsane, and Qonce.",
    emblem: "BUF",
    sealClass: "bg-orange-500/20 text-orange-950 border-orange-500/40",
  },
  {
    name: "Mangaung Metropolitan Municipality (Bloemfontein)",
    short: "Mangaung",
    province: "Free State",
    wards: 51,
    category: "Metropolitan",
    code: "MAN",
    description:
      "Judicial capital of South Africa serving Bloemfontein, Botshabelo, and Thaba 'Nchu.",
    emblem: "MAN",
    sealClass: "bg-rose-500/20 text-rose-950 border-rose-500/40",
  },
  {
    name: "Msunduzi Local Municipality (Pietermaritzburg)",
    short: "Msunduzi",
    province: "KwaZulu-Natal",
    wards: 41,
    category: "Local",
    code: "KZN225",
    description:
      "Provincial capital of KwaZulu-Natal set in the scenic Midlands with vital commerce and heritage.",
    emblem: "MSU",
    sealClass: "bg-emerald-500/20 text-emerald-950 border-emerald-500/40",
  },
  {
    name: "Polokwane Municipality",
    short: "Polokwane",
    province: "Limpopo",
    wards: 45,
    category: "Local",
    code: "LIM354",
    description:
      "The economic heart and provincial capital of Limpopo connecting southern Africa trade routes.",
    emblem: "POL",
    sealClass: "bg-amber-600/20 text-amber-950 border-amber-600/40",
  },
];

export const councillors: Councillor[] = [
  {
    id: "naledi-mokoena",
    name: "Naledi Mokoena",
    ward: "47",
    municipality: "eThekwini Metropolitan Municipality (Durban)",
    areas: "Berea · Musgrave",
    image: nalediPortrait,
    focus: ["Public health", "Water infrastructure", "Youth safety"],
    party: { name: "Civic Alliance", initials: "CA", tone: "party-emerald" },
    statement:
      "Supporting reliable local water pressure, scheduled repairs, and proactive neighbourhood clinics.",
    commitments: 8,
    activityScore: 98,
    isMostActive: true,
    email: "ward47@ethekwini.gov.za",
    phone: "+27 (031) 311 4747",
    officeHours: "Mon - Fri, 08:30 - 16:00",
  },
  {
    id: "thabo-nkosi",
    name: "Thabo Nkosi",
    ward: "115",
    municipality: "City of Johannesburg",
    areas: "Fourways · Bloubosrand · Douglasdale",
    image: thaboPortrait,
    focus: ["Housing", "Roads & Traffic", "Substation security"],
    party: { name: "Ubuntu Movement", initials: "UM", tone: "party-gold" },
    statement:
      "Focused on pothole eradication, proactive traffic light solarization, and transparent municipal feedback.",
    commitments: 7,
    activityScore: 95,
    isMostActive: true,
    email: "ward115@joburg.org.za",
    phone: "+27 (011) 407 1150",
    officeHours: "Mon - Thu, 09:00 - 15:30",
  },
  {
    id: "zanele-dlamini",
    name: "Zanele Dlamini",
    ward: "36",
    municipality: "City of Cape Town",
    areas: "Langa · Pinelands",
    image: zanelePortrait,
    focus: ["Youth Development", "Community Safety", "Urban greening"],
    party: { name: "People First", initials: "PF", tone: "party-coral" },
    statement:
      "Working for safer streets, regular civic meetings, and after-school digital skills opportunities.",
    commitments: 6,
    activityScore: 93,
    isMostActive: true,
    email: "ward36@capetown.gov.za",
    phone: "+27 (021) 400 3636",
    officeHours: "Tue - Fri, 09:00 - 16:30",
  },
  {
    id: "kagiso-molefe",
    name: "Kagiso Molefe",
    ward: "59",
    municipality: "City of Tshwane (Pretoria)",
    areas: "Centurion · Lyttelton · Doringkloof",
    image: thaboPortrait,
    focus: ["Substation Upgrades", "Clean Water", "Parks upkeep"],
    party: { name: "Civic Alliance", initials: "CA", tone: "party-emerald" },
    statement:
      "Prioritising electrical substation upgrades, pipe replacement timelines, and swift service ticket turnarounds.",
    commitments: 6,
    activityScore: 91,
    isMostActive: true,
    email: "ward59@tshwane.gov.za",
    phone: "+27 (012) 358 5959",
    officeHours: "Mon - Fri, 08:00 - 15:00",
  },
  {
    id: "sipho-ndlovu",
    name: "Sipho Ndlovu",
    ward: "24",
    municipality: "Ekurhuleni Metropolitan Municipality (East Rand)",
    areas: "Kempton Park · Tembisa West",
    image: thaboPortrait,
    focus: ["Sanitation", "Local Transit", "Youth employment"],
    party: { name: "Ubuntu Movement", initials: "UM", tone: "party-gold" },
    statement:
      "Advancing integrated municipal transit and prompt resolution of water service disruptions.",
    commitments: 5,
    activityScore: 89,
    isMostActive: false,
    email: "ward24@ekurhuleni.gov.za",
    phone: "+27 (011) 999 2424",
    officeHours: "Mon - Thu, 09:00 - 16:00",
  },
  {
    id: "luvuyo-mthembu",
    name: "Luvuyo Mthembu",
    ward: "7",
    municipality: "Nelson Mandela Bay Metropolitan Municipality (Gqeberha)",
    areas: "Summerstrand · Central · Humewood",
    image: zanelePortrait,
    focus: ["Water Security", "Coastal tourism", "Streetlighting"],
    party: { name: "People First", initials: "PF", tone: "party-coral" },
    statement:
      "Ensuring reservoir capacity safeguards and coastal infrastructure rejuvenation for local business.",
    commitments: 5,
    activityScore: 88,
    isMostActive: false,
    email: "ward7@mandelametro.gov.za",
    phone: "+27 (041) 506 7007",
    officeHours: "Mon - Fri, 08:30 - 15:30",
  },
  {
    id: "ayanda-sithole",
    name: "Ayanda Sithole",
    ward: "18",
    municipality: "Buffalo City Metropolitan Municipality (East London)",
    areas: "Beacon Bay · Nahoon · Bunkers Hill",
    image: nalediPortrait,
    focus: ["Stormwater Channels", "Road Maintenance", "Beach amenities"],
    party: { name: "Civic Alliance", initials: "CA", tone: "party-emerald" },
    statement:
      "Revitalising local coastal roads, modernising stormwater channels, and supporting community cleanup drives.",
    commitments: 5,
    activityScore: 87,
    isMostActive: false,
    email: "ward18@buffalocity.gov.za",
    phone: "+27 (043) 705 1818",
    officeHours: "Tue - Fri, 09:00 - 16:00",
  },
  {
    id: "lerato-khumalo",
    name: "Lerato Khumalo",
    ward: "21",
    municipality: "Mangaung Metropolitan Municipality (Bloemfontein)",
    areas: "Universitas · Brandwag · Westdene",
    image: zanelePortrait,
    focus: ["Urban Parks", "Refuse collection", "Student safety"],
    party: { name: "Ubuntu Movement", initials: "UM", tone: "party-gold" },
    statement:
      "Rebuilding municipal park spaces, sports grounds, and reliable refuse collection routes.",
    commitments: 4,
    activityScore: 85,
    isMostActive: false,
    email: "ward21@mangaung.co.za",
    phone: "+27 (051) 405 2121",
    officeHours: "Mon - Thu, 08:30 - 15:00",
  },
  {
    id: "bongani-cele",
    name: "Bongani Cele",
    ward: "26",
    municipality: "Msunduzi Local Municipality (Pietermaritzburg)",
    areas: "Scottsville · Hayfields · Pelham",
    image: thaboPortrait,
    focus: ["Electricity Substation", "Youth Hubs", "Pothole blitz"],
    party: { name: "People First", initials: "PF", tone: "party-coral" },
    statement:
      "Championing grid stability, community policing forums, and vocational youth skills workshops.",
    commitments: 4,
    activityScore: 84,
    isMostActive: false,
    email: "ward26@msunduzi.gov.za",
    phone: "+27 (033) 392 2626",
    officeHours: "Mon - Fri, 08:00 - 15:30",
  },
  {
    id: "mpho-ramaphosa",
    name: "Mpho Ramaphosa",
    ward: "19",
    municipality: "Polokwane Municipality",
    areas: "Bendor · Fauna Park · Sterpark",
    image: nalediPortrait,
    focus: ["Borehole Backup", "Solar Streetlights", "Zoning transparency"],
    party: { name: "Civic Alliance", initials: "CA", tone: "party-emerald" },
    statement:
      "Expanding alternative water access and solar-assisted street illumination across our suburbs.",
    commitments: 6,
    activityScore: 92,
    isMostActive: true,
    email: "ward19@polokwane.gov.za",
    phone: "+27 (015) 290 1919",
    officeHours: "Mon - Fri, 08:00 - 16:00",
  },
];

export const wards: Ward[] = [
  {
    wardNumber: "115",
    municipality: "City of Johannesburg",
    province: "Gauteng",
    suburbs: "Fourways, Bloubosrand, Douglasdale, Witkoppen",
    councillorName: "Thabo Nkosi",
    registeredVoters: 24350,
    activeProjects: 6,
    keyPriorities: [
      "Road surfacing on Witkoppen Rd",
      "Mini-substation security",
      "Fourways park clean-up",
    ],
  },
  {
    wardNumber: "47",
    municipality: "eThekwini Metropolitan Municipality (Durban)",
    province: "KwaZulu-Natal",
    suburbs: "Berea, Musgrave, Essenwood",
    councillorName: "Naledi Mokoena",
    registeredVoters: 21800,
    activeProjects: 8,
    keyPriorities: [
      "Water valve automation",
      "Musgrave park rejuvenation",
      "Mobile community clinic",
    ],
  },
  {
    wardNumber: "36",
    municipality: "City of Cape Town",
    province: "Western Cape",
    suburbs: "Langa, Pinelands, Ndabeni",
    councillorName: "Zanele Dlamini",
    registeredVoters: 26100,
    activeProjects: 5,
    keyPriorities: [
      "Street lighting upgrades",
      "Youth coding hub at Langa",
      "Pinelands canal maintenance",
    ],
  },
  {
    wardNumber: "59",
    municipality: "City of Tshwane (Pretoria)",
    province: "Gauteng",
    suburbs: "Centurion, Lyttelton Manor, Doringkloof",
    councillorName: "Kagiso Molefe",
    registeredVoters: 23150,
    activeProjects: 7,
    keyPriorities: [
      "Botha Ave drainage upgrade",
      "Substation security monitoring",
      "Public library solar installation",
    ],
  },
  {
    wardNumber: "24",
    municipality: "Ekurhuleni Metropolitan Municipality (East Rand)",
    province: "Gauteng",
    suburbs: "Kempton Park Ext, Tembisa West",
    councillorName: "Sipho Ndlovu",
    registeredVoters: 25400,
    activeProjects: 4,
    keyPriorities: [
      "Sanitation pipe replacement",
      "Tembisa commuter rank paving",
      "Refuse collection schedule",
    ],
  },
  {
    wardNumber: "7",
    municipality: "Nelson Mandela Bay Metropolitan Municipality (Gqeberha)",
    province: "Eastern Cape",
    suburbs: "Summerstrand, Gqeberha Central, Humewood",
    councillorName: "Luvuyo Mthembu",
    registeredVoters: 19800,
    activeProjects: 5,
    keyPriorities: [
      "Beachfront promenade repair",
      "Pressure-reducing water valves",
      "University corridor security",
    ],
  },
  {
    wardNumber: "18",
    municipality: "Buffalo City Metropolitan Municipality (East London)",
    province: "Eastern Cape",
    suburbs: "Beacon Bay, Nahoon, Bunkers Hill",
    councillorName: "Ayanda Sithole",
    registeredVoters: 18400,
    activeProjects: 6,
    keyPriorities: [
      "Nahoon mouth stormwater diversion",
      "Bunkers Hill road rehabilitation",
      "Coastal conservation patrol",
    ],
  },
  {
    wardNumber: "21",
    municipality: "Mangaung Metropolitan Municipality (Bloemfontein)",
    province: "Free State",
    suburbs: "Universitas, Brandwag, Westdene",
    councillorName: "Lerato Khumalo",
    registeredVoters: 20300,
    activeProjects: 4,
    keyPriorities: [
      "Universitas park perimeter fencing",
      "High-mast lighting maintenance",
      "Water tanker backup points",
    ],
  },
  {
    wardNumber: "26",
    municipality: "Msunduzi Local Municipality (Pietermaritzburg)",
    province: "KwaZulu-Natal",
    suburbs: "Scottsville, Hayfields, Pelham",
    councillorName: "Bongani Cele",
    registeredVoters: 17900,
    activeProjects: 5,
    keyPriorities: [
      "Scottsville substation protection",
      "Hayfields stream cleaning",
      "Pothole patch blitz",
    ],
  },
  {
    wardNumber: "19",
    municipality: "Polokwane Municipality",
    province: "Limpopo",
    suburbs: "Bendor, Fauna Park, Sterpark",
    councillorName: "Mpho Ramaphosa",
    registeredVoters: 22100,
    activeProjects: 7,
    keyPriorities: [
      "Fauna Park solar streetlights",
      "Community borehole network",
      "Munnik Ave traffic flow improvements",
    ],
  },
];
