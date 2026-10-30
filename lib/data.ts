import { ServiceItem, ProjectItem, BlogPostItem, InquiryItem, AppointmentItem, CustomerUser } from "@/types";

export const COMPANY_PROFILE = {
  name: "Vanguard Meridian Partners",
  legalName: "Vanguard Meridian Advisory & Engineering Corp.",
  tagline: "High-Consequence Technology Architecture & Enterprise Advisory",
  founded: "2014",
  headquarters: "Financial District, New York & Zurich",
  overview: "Vanguard Meridian is a specialized systems architecture and management advisory consultancy. We advise boards, chief technology executives, and institutional infrastructure leaders on mission-critical platform modernizations, regulated digital resilience, and sovereign compute operations.",
  addresses: [
    {
      location: "New York Principal Office",
      street: "One World Trade Center, Suite 7800",
      city: "New York, NY 10007",
      phone: "+1 (212) 849-3100",
      email: "nyc@vanguardmeridian.com"
    },
    {
      location: "European Operations",
      street: "Bleicherweg 10, Paradeplatz",
      city: "8002 Zurich, Switzerland",
      phone: "+41 (44) 211-9400",
      email: "zurich@vanguardmeridian.com"
    }
  ],
  workingHours: "Monday through Friday: 08:00 – 18:00 (EST / CET)",
  supportEmail: "client-advisory@vanguardmeridian.com",
  inquiryEmail: "inquiries@vanguardmeridian.com",
};

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: "srv-01",
    slug: "enterprise-systems-architecture",
    title: "Enterprise Systems Architecture & Cloud Topology",
    shortDescription: "Designing resilient, distributed computing topologies engineered for continuous availability and multi-region failover across Tier 1 institutions.",
    fullDescription: "Our Enterprise Systems Architecture practice audits, formulates, and guides the rollout of fault-tolerant computing substrates. We transition monolithic estates into decoupling-safe bounded contexts, hybrid multi-cloud topologies, and low-latency transactional cores without operational disruption.",
    category: "Systems Engineering",
    capabilities: [
      "Distributed Event-Driven Topology Design",
      "Zero-Downtime Database Migration Frameworks",
      "Sovereign Multi-Cloud Redundancy & Hybrid Infrastructure",
      "Infrastructure-as-Code (Terraform, Pulumi, Kubernetes) Standardization"
    ],
    deliverables: [
      "Comprehensive Architectural Blueprints & Threat Assessments",
      "Topology Sizing, Cost Model, and Capacity Forecasts",
      "Disaster Recovery (RTO < 60s, RPO = 0) Runbooks",
      "Executive Board Technology Roadmaps"
    ],
    leadTime: "6 to 16 weeks",
    featured: true,
    published: true,
    status: "active"
  },
  {
    id: "srv-02",
    slug: "regulated-security-resilience",
    title: "Cyber Resilience & Zero-Trust Governance",
    shortDescription: "Rigorous compliance architectures, cryptographic boundary hardening, and zero-trust policies for regulated capital markets and health networks.",
    fullDescription: "We engineer defense-in-depth posture assessments directly aligned with SEC, DORA, SOC2 Type II, and HIPAA compliance mandates. We do not stop at paper compliance; we test workload isolation, cryptographic key hierarchies, and automated continuous policy enforcement.",
    category: "Enterprise Security",
    capabilities: [
      "Zero-Trust Architecture & Identity Boundary Federation",
      "Hardware Security Module (HSM) & Key Management Rigor",
      "DORA (Digital Operational Resilience Act) Readiness",
      "Continuous Policy as Code (OPA / Gatekeeper) Integration"
    ],
    deliverables: [
      "Cryptographic and Network Perimeter Hardening Audits",
      "Third-Party Vendor Supply Chain Risk Assessments",
      "Executive Incident Orchestration Playbooks",
      "Compliance Attestation Artifacts"
    ],
    leadTime: "8 to 14 weeks",
    featured: true,
    published: true,
    status: "active"
  },
  {
    id: "srv-03",
    slug: "data-intelligence-analytics",
    title: "Institutional Data Pipelines & Semantic AI Platforms",
    shortDescription: "Real-time streaming backbones, governed feature stores, and private AI infrastructure built under strict data sovereignty parameters.",
    fullDescription: "Deploy data foundations capable of ingesting petabyte-scale telemetry with deterministic latency. We build private retrieval-augmented platforms, vector engines, and high-throughput analytical fabrics designed to keep proprietary intellectual property within your secured enclave.",
    category: "Data & Intelligence",
    capabilities: [
      "Streaming Data Fabrics with Apache Kafka & Apache Flink",
      "Air-Gapped Private LLM / Vector Search Architectures",
      "Automated Lineage, Data Cataloging & Data Quality SLAs",
      "Modern Lakehouse Implementations (Iceberg, Delta Lake)"
    ],
    deliverables: [
      "Production-Ready Lakehouse Architecture Specifications",
      "Data Governance Charter & Access Boundary Matrices",
      "Proof of Value Benchmark Reports",
      "Operational Observability Suites"
    ],
    leadTime: "10 to 20 weeks",
    featured: true,
    published: true,
    status: "active"
  },
  {
    id: "srv-04",
    slug: "digital-transformation-advisory",
    title: "Strategic Modernization & Legacy Decommissioning",
    shortDescription: "Pragmatic strangler-fig migration roadmaps to retire high-cost mainframes and legacy systems while preserving critical business logic.",
    fullDescription: "Legacy transitions frequently fail because of underestimated operational entanglements. Vanguard Meridian utilizes methodical domain-driven decomposition, side-by-side verification harnesses, and incremental traffic shifting to ensure continuous business continuity throughout multi-year transitions.",
    category: "Strategic Advisory",
    capabilities: [
      "Core Banking & Transaction Core Modernization",
      "Strangler Fig Migration Orchestration",
      "Total Cost of Ownership (TCO) Rationalization Audits",
      "Staff Engineering Upskilling & Technical Governance"
    ],
    deliverables: [
      "Step-by-Step Modernization Phasing Blueprint",
      "Parallel Run Validation Engines",
      "Executive Progress Steering Dashboards",
      "Technical Debt Amortization Plans"
    ],
    leadTime: "12 to 24 weeks",
    featured: false,
    published: true,
    status: "active"
  },
  {
    id: "srv-05",
    slug: "platform-engineering-devops",
    title: "Internal Developer Platforms & Continuous Delivery",
    shortDescription: "Standardizing internal developer experience (IDP) to accelerate cycle time from weeks to hours without compromising compliance gates.",
    fullDescription: "Engineering throughput slows when development teams are saddled with ad-hoc cloud provisioning and manual change management tickets. We establish sovereign platform APIs, preview environments, automated security guardrails, and deterministic deployment pipelines.",
    category: "Systems Engineering",
    capabilities: [
      "Ephemeral Environment Orchestration",
      "Automated Compliance and Container Scanning Pipelines",
      "GitOps with ArgoCD and Secure Secret Orchestration",
      "Developer Self-Service Catalogues"
    ],
    deliverables: [
      "Turnkey Internal Developer Platform Repository",
      "Pipeline Security Validation Runbooks",
      "Cycle Time Measurement Instrumentation",
      "Golden Path Documentation for Engineering Teams"
    ],
    leadTime: "6 to 12 weeks",
    featured: false,
    published: true,
    status: "active"
  }
];

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: "proj-01",
    slug: "pan-european-clearing-modernization",
    title: "Clearing & Settlement Core Transformation",
    clientIndustry: "Financial Markets Infrastructure",
    timeline: "14-Month Program Delivery",
    summary: "Architected a dual-region active-active settlement backbone processing over $12B daily volume with sub-10ms reconciliation guarantees.",
    challenge: "The client operated a 22-year-old COBOL and mainframe transaction core vulnerable to scaling bottlenecks during peak market volatility, facing impending regulatory scrutiny under revised operational resilience standards.",
    approach: "Vanguard Meridian introduced a decoupled event-driven streaming layer using Apache Kafka and Rust-based state machines. We ran dual-execution verifiers for 6 months to validate zero balance divergence across 45 million simulated transactions before switching primary settlement traffic.",
    outcomes: [
      { metric: "99.999%", label: "Verified Production Uptime" },
      { metric: "< 6ms", label: "P99 Order Processing Latency" },
      { metric: "42%", label: "Infrastructure Operational Cost Reduction" }
    ],
    tags: ["Distributed Systems", "FinTech", "DORA Compliance", "High Availability"],
    featured: true,
    published: true
  },
  {
    id: "proj-02",
    slug: "global-pharma-clinical-data-fabric",
    title: "Air-Gapped Sovereign Clinical Data Engine",
    clientIndustry: "Life Sciences & Oncology Research",
    timeline: "9-Month Phased Rollout",
    summary: "Engineered an air-gapped, zero-trust analytical environment uniting multi-national trial telemetry across 14 hospital networks without transferring patient PII.",
    challenge: "Strict cross-border healthcare data regulations prevented consolidated training of biomarker prediction models, leading to isolated trial silos and delayed discovery pipelines.",
    approach: "We designed a federated learning architecture with cryptographic enclaves (Confidential Computing) allowing distributed model weights to update centrally while raw genomic records never traversed hospital jurisdictional boundaries.",
    outcomes: [
      { metric: "14 Nodes", label: "Secure Federated Healthcare Enclaves" },
      { metric: "100%", label: "GDPR & HIPAA Compliance Verification" },
      { metric: "3.4x", label: "Acceleration in Trial Synthesis Speed" }
    ],
    tags: ["Confidential Computing", "Healthcare", "Data Sovereignty", "Zero-Trust"],
    featured: true,
    published: true
  },
  {
    id: "proj-03",
    slug: "logistics-iot-edge-telemetry",
    title: "Autonomous Fleet Orchestration Substrate",
    clientIndustry: "Intermodal Freight & Maritime Logistics",
    timeline: "11-Month Advisory & Engineering",
    summary: "Built a fault-tolerant edge-to-cloud telemetry grid coordinating 26,000 refrigerated freight units across 4 oceans with intermittent satellite connectivity.",
    challenge: "Intermittent connectivity caused telemetry blindspots, resulting in cargo spoilage risks, delayed customs filings, and manual temperature log reconciliation at entry ports.",
    approach: "Devised a local-first store-and-forward edge runtime with deterministic time-series synchronization that automates customs certification the instant a vessel connects to harbor Wi-Fi.",
    outcomes: [
      { metric: "26,000+", label: "Connected Operational Assets" },
      { metric: "0%", label: "Unlogged Regulatory Thermal Violations" },
      { metric: "$18M+", label: "Annual Spoilage Mitigation" }
    ],
    tags: ["Edge Computing", "IoT Telemetry", "Supply Chain", "Distributed Sync"],
    featured: true,
    published: true
  },
  {
    id: "proj-04",
    slug: "tier-1-telecom-idp",
    title: "Global Internal Platform & Multi-Cluster Fabric",
    clientIndustry: "Telecommunications & Carrier Services",
    timeline: "8-Month Acceleration Program",
    summary: "Standardized software delivery across 1,800 engineers spanning 4 continents, enforcing security controls and environment reproducibility.",
    challenge: "Over 80 disconnected internal teams were building divergent CI/CD tooling, resulting in vulnerability remediation backlogs averaging 110 days.",
    approach: "Implemented a central developer platform combining Backstage, Crossplane, and automated policy verification. Engineering teams now spin up audited cloud sandboxes in under 12 minutes.",
    outcomes: [
      { metric: "12 min", label: "Average Infrastructure Spin-up Time" },
      { metric: "-78%", label: "Mean Time to Patch High-Severity CVEs" },
      { metric: "1,800+", label: "Engineers Onboarded" }
    ],
    tags: ["Platform Engineering", "Kubernetes", "DevOps Governance", "Security"],
    featured: false,
    published: true
  }
];

export const BLOG_POSTS: BlogPostItem[] = [
  {
    id: "post-01",
    slug: "deterministic-recovery-in-distributed-cores",
    title: "Engineering Deterministic Recovery in High-Consequence Financial Systems",
    summary: "Why conventional active-passive failover models fail during non-deterministic network partition events, and how state-machine replication mitigates split-brain hazards.",
    category: "Architecture",
    publishedAt: "2026-10-14",
    readTime: "8 min read",
    author: {
      name: "Marcus Vance",
      role: "Chief Systems Architect"
    },
    status: "published",
    content: "When engineering core clearing systems or mission-critical industrial backbones, relying on heartbeat-based active-passive failover creates a dangerous illusion of resilience. In this technical paper, we evaluate split-brain edge cases observed during BGP flaps and discuss quorum-driven consensus patterns that ensure zero transactional loss."
  },
  {
    id: "post-02",
    slug: "navigating-dora-regulatory-compliance",
    title: "Operationalizing DORA: Beyond Checklist Compliance into Verifiable Stress Testing",
    summary: "A practical guide for financial entity leadership preparing for rigorous continuous digital resilience assessments.",
    category: "Governance",
    publishedAt: "2026-09-28",
    readTime: "6 min read",
    author: {
      name: "Elena Rostova",
      role: "Managing Director, Regulatory Risk"
    },
    status: "published",
    content: "The Digital Operational Resilience Act (DORA) shifts the compliance burden from self-attestation to demonstrable operational continuity. Here we review how enterprise engineering teams can embed automated chaos injection, third-party concentration risk tracking, and board-ready resilience dashboards into daily delivery cycles."
  },
  {
    id: "post-03",
    slug: "sovereign-ai-in-air-gapped-enclaves",
    title: "Deploying Private Intelligence: Running Frontier Embeddings Inside Regulated Perimeters",
    summary: "Architectural patterns for leveraging retrieval augmented architectures while satisfying strict sovereign data protection directives.",
    category: "Applied AI",
    publishedAt: "2026-09-11",
    readTime: "9 min read",
    author: {
      name: "David Chen, Ph.D.",
      role: "Principal, Applied Intelligence"
    },
    status: "published",
    content: "Enterprises in defense, legal advisory, and investment banking face immense pressure to exploit generative workflows without exposing proprietary deal rooms to public inference providers. We explore confidential GPU enclaves and localized vector indexing methodologies that prevent cross-tenant data leakage."
  }
];

export const MOCK_INQUIRIES: InquiryItem[] = [
  {
    id: "inq-101",
    ticketNumber: "INQ-2026-8812",
    name: "Catherine DeWitt",
    email: "c.dewitt@apexclearingcorp.example",
    organization: "Apex Clearing Holdings",
    phone: "+1 (312) 555-0192",
    subject: "Multi-Region Distributed Core Assessment",
    message: "We are currently evaluating modernization options for our secondary clearing line in Frankfurt and Chicago. Seeking a formal architectural review to evaluate latency impact under high transaction spikes.",
    serviceInterest: "Enterprise Systems Architecture & Cloud Topology",
    submittedAt: "2026-10-28T14:32:00Z",
    status: "new",
    priority: "high"
  },
  {
    id: "inq-102",
    ticketNumber: "INQ-2026-8813",
    name: "Dr. Julian Weiss",
    email: "j.weiss@bavaria-healthnet.de.example",
    organization: "Bavarian Medical Informatics Consortium",
    phone: "+49 89 2180-0",
    subject: "GDPR Compliant Federated Analytics Inquiry",
    message: "Our network connects 8 teaching hospitals. We require guidance on architectural enclaves to run multi-site oncology inference without patient data federation violations.",
    serviceInterest: "Institutional Data Pipelines & Semantic AI Platforms",
    submittedAt: "2026-10-27T09:15:00Z",
    status: "in_review",
    priority: "high"
  },
  {
    id: "inq-103",
    ticketNumber: "INQ-2026-8814",
    name: "Arthur Pendelton",
    email: "arthur@meridian-shipping.ch.example",
    organization: "Meridian Global Logistics AG",
    phone: "+41 22 799 4110",
    subject: "DORA Compliance & Supplier Audit Readiness",
    message: "Preparing our external vendor resilience review ahead of our Q1 board audit. Requesting an exploratory advisory briefing on your audit methodologies.",
    serviceInterest: "Cyber Resilience & Zero-Trust Governance",
    submittedAt: "2026-10-26T16:45:00Z",
    status: "contacted",
    priority: "medium"
  },
  {
    id: "inq-104",
    ticketNumber: "INQ-2026-8815",
    name: "Siddharth Rao",
    email: "siddharth.rao@strataglobe.in.example",
    organization: "Strata Global Networks",
    phone: "+91 22 6123 4567",
    subject: "Internal Developer Platform Migration Support",
    message: "We want to standardize cloud provisioning templates across our cloud infrastructure teams. Would like to discuss scoping a 10-week implementation engagement.",
    serviceInterest: "Internal Developer Platforms & Continuous Delivery",
    submittedAt: "2026-10-25T11:20:00Z",
    status: "resolved",
    priority: "low"
  }
];

export const MOCK_APPOINTMENTS: AppointmentItem[] = [
  {
    id: "apt-201",
    bookingRef: "VM-APT-4901",
    clientName: "Eleanor Sterling",
    clientEmail: "e.sterling@sterling-capital.example",
    organization: "Sterling Private Capital",
    serviceRequested: "Enterprise Systems Architecture & Cloud Topology",
    preferredDate: "2026-11-04",
    preferredTime: "10:00 AM EST",
    status: "confirmed",
    meetingType: "On-Site Executive Briefing",
    notes: "Executive suite consultation at New York office. Principal architect participation requested."
  },
  {
    id: "apt-202",
    bookingRef: "VM-APT-4902",
    clientName: "Frederik Lindqvist",
    clientEmail: "f.lindqvist@nordic-maritime.se.example",
    organization: "Nordic Intermodal Transport",
    serviceRequested: "Institutional Data Pipelines & Semantic AI Platforms",
    preferredDate: "2026-11-06",
    preferredTime: "02:30 PM CET",
    status: "pending",
    meetingType: "Video Conference (Teams/Zoom)",
    notes: "Review edge-to-cloud telemetry sync challenges and cold-storage compliance."
  },
  {
    id: "apt-203",
    bookingRef: "VM-APT-4903",
    clientName: "Beatrix Morreau",
    clientEmail: "bm@luxembourg-custody.lu.example",
    organization: "Luxembourg Digital Custody SA",
    serviceRequested: "Cyber Resilience & Zero-Trust Governance",
    preferredDate: "2026-11-09",
    preferredTime: "11:00 AM CET",
    status: "pending",
    meetingType: "Video Conference (Teams/Zoom)",
    notes: "DORA gap analysis preliminary discussion."
  }
];

export const MOCK_CUSTOMERS: CustomerUser[] = [
  {
    id: "usr-01",
    name: "Eleanor Sterling",
    email: "e.sterling@sterling-capital.example",
    company: "Sterling Private Capital",
    role: "Chief Technology Officer",
    joinedDate: "2025-08-14",
    status: "active",
    tier: "Enterprise"
  },
  {
    id: "usr-02",
    name: "Julian Weiss, M.D.",
    email: "j.weiss@bavaria-healthnet.de.example",
    company: "Bavarian Medical Informatics Consortium",
    role: "Chief Information Security Officer",
    joinedDate: "2026-02-19",
    status: "active",
    tier: "Enterprise"
  },
  {
    id: "usr-03",
    name: "Arthur Pendelton",
    email: "arthur@meridian-shipping.ch.example",
    company: "Meridian Global Logistics AG",
    role: "Head of Digital Infrastructure",
    joinedDate: "2026-05-10",
    status: "active",
    tier: "Advisory Partner"
  },
  {
    id: "usr-04",
    name: "Beatrix Morreau",
    email: "bm@luxembourg-custody.lu.example",
    company: "Luxembourg Digital Custody SA",
    role: "VP of Risk & Compliance",
    joinedDate: "2026-10-02",
    status: "invited",
    tier: "Standard"
  }
];

export const FAQS_DATA = [
  {
    question: "What is Vanguard Meridian's engagement model for institutional clients?",
    answer: "We structure engagements either as targeted Diagnostic & Architecture Reviews (typically 4–8 weeks with concrete blueprint deliverables) or as Integrated Program Advisory & Implementation teams where our principal architects embed alongside your executive leadership and senior engineering staff."
  },
  {
    question: "How do you handle confidentiality and sensitive infrastructure assessments?",
    answer: "All engagements operate under bilateral mutual non-disclosure agreements with zero-trust information handling. For defense, regulated finance, and health clients, our advisory staff work exclusively on dedicated client-provisioned hardware or within client-controlled secure boundary enclaves."
  },
  {
    question: "Do you supply ongoing maintenance or only strategic advisory?",
    answer: "Our core expertise is in architecture formulation, high-risk migration execution, and platform standardization. After stabilizing systems, we establish internal Centers of Excellence and conduct extensive knowledge transfer to enable your internal teams to own and operate the systems long term."
  },
  {
    question: "What regions do your advisory teams physically support?",
    answer: "We maintain permanent offices in New York and Zurich, serving clients throughout North America, the United Kingdom, Switzerland, and the European Union. On-site executive briefings and war-room engagements are routinely supported globally."
  },
  {
    question: "Are your methodologies compliant with international regulatory frameworks?",
    answer: "Yes. Our systems engineering and cyber resilience practices strictly incorporate standards including SEC Rule 17a-4, EU DORA (Digital Operational Resilience Act), NIST 800-53, SOC2 Type II, and HIPAA compliance specifications."
  }
];
