
// Mock data for catering events
export interface CateringEvent {
  id: string;
  clientName: string;
  eventTime: string;
  deliveryAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  status: "upcoming" | "in-progress" | "completed";
  progress: number; // 0-100
  items: CateringItem[];
  staff: StaffMember[];
  notes: string;
  specialEquipment: string[];
}

export interface CateringItem {
  id: string;
  name: string;
  status: "pending" | "prepared" | "packed" | "loaded";
  subItems: SubItem[];
}

export interface SubItem {
  id: string;
  name: string;
  status: "pending" | "prepared" | "packed" | "loaded";
  isFoodItem: boolean;
}

export interface StaffMember {
  id: string;
  name: string;
  role: string;
  contact: string;
}

export const mockEvents: CateringEvent[] = [
  {
    id: "event-001",
    clientName: "Johnson Wedding",
    eventTime: "2025-04-20T16:30:00",
    deliveryAddress: {
      street: "123 Park Avenue",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      coordinates: {
        lat: 40.7484,
        lng: -73.9857
      }
    },
    status: "upcoming",
    progress: 25,
    items: [
      {
        id: "item-001",
        name: "Chicken Biryani",
        status: "prepared",
        subItems: [
          { id: "sub-001", name: "Basmati Rice", status: "prepared", isFoodItem: true },
          { id: "sub-002", name: "Chicken Pieces", status: "prepared", isFoodItem: true },
          { id: "sub-003", name: "Serving Spoons", status: "packed", isFoodItem: false },
          { id: "sub-004", name: "Food Warmers", status: "pending", isFoodItem: false }
        ]
      },
      {
        id: "item-002",
        name: "Fresh Juice Bar",
        status: "pending",
        subItems: [
          { id: "sub-005", name: "Orange Juice", status: "prepared", isFoodItem: true },
          { id: "sub-006", name: "Apple Juice", status: "prepared", isFoodItem: true },
          { id: "sub-007", name: "Disposable Glasses", status: "packed", isFoodItem: false },
          { id: "sub-008", name: "Napkins", status: "packed", isFoodItem: false },
          { id: "sub-009", name: "Pouring Jugs", status: "pending", isFoodItem: false },
          { id: "sub-010", name: "Ice Bucket", status: "pending", isFoodItem: false }
        ]
      },
      {
        id: "item-003",
        name: "Coffee Service",
        status: "pending",
        subItems: [
          { id: "sub-011", name: "Coffee Beans", status: "prepared", isFoodItem: true },
          { id: "sub-012", name: "Milk", status: "prepared", isFoodItem: true },
          { id: "sub-013", name: "Sugar", status: "packed", isFoodItem: true },
          { id: "sub-014", name: "Cups", status: "packed", isFoodItem: false },
          { id: "sub-015", name: "Coffee Machine", status: "pending", isFoodItem: false }
        ]
      }
    ],
    staff: [
      { id: "staff-001", name: "Michael Scott", role: "Event Manager", contact: "555-1234" },
      { id: "staff-002", name: "Jim Halpert", role: "Caterer", contact: "555-5678" },
      { id: "staff-003", name: "Pam Beesly", role: "Server", contact: "555-9101" }
    ],
    notes: "Bride and groom have requested special vegan options for 5 guests.",
    specialEquipment: ["Chafing Dishes", "Extra Tables", "Wedding Cake Stand"]
  },
  {
    id: "event-002",
    clientName: "Tech Corp Annual Meeting",
    eventTime: "2025-04-20T09:00:00",
    deliveryAddress: {
      street: "456 Business Center",
      city: "San Francisco",
      state: "CA",
      zipCode: "94105",
      coordinates: {
        lat: 37.7749,
        lng: -122.4194
      }
    },
    status: "in-progress",
    progress: 65,
    items: [
      {
        id: "item-004",
        name: "Breakfast Buffet",
        status: "loaded",
        subItems: [
          { id: "sub-016", name: "Bagels", status: "loaded", isFoodItem: true },
          { id: "sub-017", name: "Cream Cheese", status: "loaded", isFoodItem: true },
          { id: "sub-018", name: "Pastry Tray", status: "loaded", isFoodItem: true },
          { id: "sub-019", name: "Fruit Platter", status: "loaded", isFoodItem: true }
        ]
      },
      {
        id: "item-005",
        name: "Sandwich Lunch",
        status: "packed",
        subItems: [
          { id: "sub-020", name: "Assorted Sandwiches", status: "prepared", isFoodItem: true },
          { id: "sub-021", name: "Chips", status: "packed", isFoodItem: true },
          { id: "sub-022", name: "Cookies", status: "packed", isFoodItem: true },
          { id: "sub-023", name: "Soft Drinks", status: "packed", isFoodItem: true }
        ]
      }
    ],
    staff: [
      { id: "staff-004", name: "Dwight Schrute", role: "Event Manager", contact: "555-2468" },
      { id: "staff-005", name: "Angela Martin", role: "Caterer", contact: "555-1357" },
      { id: "staff-006", name: "Oscar Martinez", role: "Server", contact: "555-3690" },
      { id: "staff-007", name: "Kevin Malone", role: "Server", contact: "555-8042" }
    ],
    notes: "CEO has nut allergy - ensure all items are nut-free.",
    specialEquipment: ["Projector Screen", "Podium", "Microphones"]
  },
  {
    id: "event-003",
    clientName: "Smith Birthday Party",
    eventTime: "2025-04-20T18:00:00",
    deliveryAddress: {
      street: "789 Residential Lane",
      city: "Los Angeles",
      state: "CA",
      zipCode: "90001",
      coordinates: {
        lat: 34.0522,
        lng: -118.2437
      }
    },
    status: "upcoming",
    progress: 15,
    items: [
      {
        id: "item-006",
        name: "BBQ Package",
        status: "pending",
        subItems: [
          { id: "sub-024", name: "Burgers", status: "pending", isFoodItem: true },
          { id: "sub-025", name: "Hot Dogs", status: "pending", isFoodItem: true },
          { id: "sub-026", name: "Grilled Vegetables", status: "pending", isFoodItem: true },
          { id: "sub-027", name: "Condiments", status: "prepared", isFoodItem: true },
          { id: "sub-028", name: "BBQ Grill", status: "pending", isFoodItem: false },
          { id: "sub-029", name: "Grilling Tools", status: "packed", isFoodItem: false }
        ]
      },
      {
        id: "item-007",
        name: "Birthday Cake",
        status: "prepared",
        subItems: [
          { id: "sub-030", name: "Chocolate Cake", status: "prepared", isFoodItem: true },
          { id: "sub-031", name: "Candles", status: "packed", isFoodItem: false },
          { id: "sub-032", name: "Cake Server", status: "packed", isFoodItem: false },
          { id: "sub-033", name: "Plates", status: "packed", isFoodItem: false }
        ]
      }
    ],
    staff: [
      { id: "staff-008", name: "Stanley Hudson", role: "Event Manager", contact: "555-7531" },
      { id: "staff-009", name: "Phyllis Vance", role: "Caterer", contact: "555-9753" }
    ],
    notes: "Birthday boy is turning 10. Parents requested extra ice cream.",
    specialEquipment: ["Ice Cream Cooler", "Outdoor Lights", "Portable Speaker"]
  }
];
