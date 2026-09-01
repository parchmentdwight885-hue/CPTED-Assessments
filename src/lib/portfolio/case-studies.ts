// @claude:user-owned — sample-work content shown at /portfolio and
// /portfolio/[slug]. Add a new entry to CASE_STUDIES to publish another
// sample assessment; nothing else needs to change (both pages render off
// this data).

/** One block of a case study's write-up, rendered in order. */
export type CaseStudyBlock =
  | { type: 'heading'; level: 2 | 3; text: string }
  /** Small uppercase label above a list, e.g. "Observations". */
  | { type: 'label'; text: string }
  | { type: 'paragraph'; text: string }
  | { type: 'list'; items: string[] }
  | { type: 'numbered'; start?: number; items: string[] };

export interface CaseStudy {
  slug: string;
  title: string;
  location: string;
  /** One-line teaser shown on the /portfolio index card. */
  summary: string;
  assessmentType: string;
  preparedBy: string;
  documentsReviewed: string[];
  coverImage: { src: string; alt: string; width: number; height: number };
  blocks: CaseStudyBlock[];
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: 'beachfront-condominium',
    title: '5-Story Luxury Beachfront Condominium',
    location: 'Grand Cayman',
    summary:
      'A conceptual/schematic CPTED design review of a 9-unit beachfront condominium — reading the site plan, floor plans, elevations, and building section for natural surveillance, access control, and territorial reinforcement before construction documents are finalized.',
    assessmentType:
      'Crime Prevention Through Environmental Design (CPTED) — Conceptual/Schematic Design Review',
    preparedBy: 'Physical Security Consultant (CPTED, PSP, ESRM)',
    documentsReviewed: [
      'Site Plan',
      'Building Elevations (Front/Side)',
      'Building Section',
      'Ground Floor Plan',
      'Typical Floor Plan (2nd–4th)',
      'Penthouse Floor Plan (5th)',
      'Unit Mix Summary',
      'Specifications Sheet',
    ],
    coverImage: {
      src: '/assets/portfolio/beachfront-condominium/concept-board.jpg',
      alt: 'Concept board for a 5-story luxury beachfront condominium, showing the building rendering, floor plans, elevations, building section, site plan, and specifications.',
      width: 1536,
      height: 1024,
    },
    blocks: [
      { type: 'heading', level: 2, text: '1. Scope and methodology' },
      {
        type: 'paragraph',
        text: 'This assessment applies the four core CPTED strategies — Natural Surveillance, Natural Access Control, Territorial Reinforcement, and Maintenance & Management — supplemented by Target Hardening and Legitimate Activity Support, to the concept board provided. Because the source material consists of architectural renderings and schematic plans rather than engineered drawings, this review is limited to what can reasonably be inferred from massing, circulation, glazing, and stated specifications. No lighting plan, CCTV/access-control legend, or landscaping schedule was provided; gaps are flagged accordingly. The review proceeds chronologically, in the sequence a legitimate visitor — and, separately, an opportunistic intruder — would encounter the property, from the public perimeter inward and upward through the building.',
      },

      { type: 'heading', level: 2, text: '2. Chronological site walk-through' },

      { type: 'heading', level: 3, text: '2.1 Site approach and perimeter (Site Plan)' },
      {
        type: 'paragraph',
        text: 'The property sits on a beachfront parcel oriented with the building mass between the public roadway/parking side and the beach. Surface parking is positioned to the rear/side of the structure, screened by mature palm landscaping, with a pedestrian path leading through landscaped grounds toward the pool and beach terrace.',
      },
      { type: 'label', text: 'Observations' },
      {
        type: 'list',
        items: [
          'No perimeter fencing, wall, gatehouse, or vehicle barrier arm is depicted anywhere on the site plan. For a beachfront property this may be an intentional resort-style design choice, but it means the entire ground-level territory — parking, pool deck, and beach terrace — is presently undefined as private space.',
          'The parking area is dense with landscaping between it and the building approach. Palms and heavy foliage, while attractive, are a classic natural-surveillance conflict: they can obscure sightlines between parked vehicles and any monitoring point (lobby, camera, or patrol officer) at exactly the time of day (dusk/night) when vehicle-related crime is most likely.',
          'No vehicle gate, license-plate recognition, or dedicated visitor parking/drop-off zone is shown, which will complicate access control enforcement once the property is occupied.',
        ],
      },

      { type: 'heading', level: 3, text: '2.2 Public beach interface (territorial boundary)' },
      {
        type: 'paragraph',
        text: '"Direct Beach Access" is listed as a headline building feature. The pool sits between the building’s ground floor and the sand, with no wall, hedge line, or elevation change indicated between public beach and the resident amenity deck.',
      },
      { type: 'label', text: 'Observations' },
      {
        type: 'list',
        items: [
          'This is the single most significant CPTED challenge on this concept. A public beach abutting a private pool and ground-floor residential terrace, with no symbolic or real barrier, invites beach traffic to drift onto private amenity space — a territorial reinforcement failure before a single unit is occupied.',
          'Symbolic barriers that preserve the "direct access" marketing feature while still communicating a threshold — a low wall, planter line, change in paving material, or a gate at the beach-to-pool transition — should be considered at the design stage, since retrofitting this boundary after construction is far more disruptive and costly.',
        ],
      },

      {
        type: 'heading',
        level: 3,
        text: '2.3 Ground floor: lobby, amenity rooms, units 101–102 (Ground Floor Plan)',
      },
      {
        type: 'paragraph',
        text: 'The ground floor is organized with a central lobby flanked symmetrically by two "AMENITY" rooms, the elevator/stair core behind the lobby, and units 101 and 102 occupying the beach-facing wings. The pool sits at the rear of the terrace, accessible directly from the lobby/terrace zone.',
      },
      { type: 'label', text: 'Observations' },
      {
        type: 'list',
        items: [
          'No reception or concierge desk is labeled within the lobby. Given the property markets itself as a luxury building, the absence of a staffed or visibly defined control point at the single point of entry is a natural-access-control gap — there is currently nothing in the plan compelling a visitor to identify themselves before reaching the elevator core.',
          'The two amenity rooms flank the lobby with what appear to be windows/glazing onto the entry approach. If confirmed at working-drawing stage, this is a natural-surveillance strength: occupied amenity space overlooking the main approach passively deters loitering at the entrance.',
          'Ground-floor units 101 and 102 face the beach terrace directly, meaning their windows, doors, and balconies sit at grade level with direct beach exposure. Ground-floor units on an open beachfront are the highest-risk units in the building for forced entry and warrant target-hardening measures (impact-rated glazing is already specified — see Section 2.9 — but should be paired with concealed/monitored egress points and hardened balcony doors specifically at this level).',
        ],
      },

      {
        type: 'heading',
        level: 3,
        text: '2.4 Vertical circulation core: elevator and stair (all levels)',
      },
      {
        type: 'paragraph',
        text: 'A single elevator and single stair core runs centrally through the building from the parking level to the penthouse, consistent across all floor plans reviewed.',
      },
      { type: 'label', text: 'Observations' },
      {
        type: 'list',
        items: [
          'A single vertical circulation core is efficient and simplifies access-control coverage — one elevator lobby and one stairwell to monitor and card-restrict at each level, rather than multiple risers.',
          'However, it also means this core is a single point of failure: if the elevator or the stair enclosure is compromised (propped door, disabled card reader, tailgating), an intruder has direct, continuous vertical access from the parking level to every residential floor and the penthouse without needing to identify an alternate route. Stairwell doors should be alarmed/monitored (not just locked) and the elevator should be programmed to require credential validation for floor selection above the lobby, not merely for building entry.',
          'No mention of stairwell signage, emergency lighting, or intercom/duress provisions within the stair core appears in the specifications; this should be confirmed against life-safety code requirements independent of this CPTED review.',
        ],
      },

      {
        type: 'heading',
        level: 3,
        text: '2.5 Typical floors 2–4: units 201–204 (Typical Floor Plan)',
      },
      {
        type: 'paragraph',
        text: 'Each typical floor holds two units opening onto shared front and rear balconies, with the elevator/stair core centered between them.',
      },
      { type: 'label', text: 'Observations' },
      {
        type: 'list',
        items: [
          'Only two units per floor, both accessible directly from a small shared elevator lobby, is favorable for natural surveillance — residents on the same floor will notice unfamiliar persons in that small shared space more readily than in a long double-loaded corridor.',
          'The front and rear balconies shown appear continuous/stacked floor to floor on the elevation drawings (see Section 2.8). If the balconies are vertically aligned without lateral offset or a physical break, this creates a climbable "ladder" between floors — a known access-control vulnerability on beachfront buildings where ground-floor or lower-unit balconies can be used to reach upper units, bypassing the elevator/stair core entirely. This should be verified against the structural elevations and mitigated with either offset balcony geometry or anti-climb detailing (openwork railings that don’t offer footholds, greater floor-to-floor balcony separation) if alignment is confirmed.',
        ],
      },

      {
        type: 'heading',
        level: 3,
        text: '2.6 Penthouse level, 5th floor: units S01–S02 and penthouse lounge',
      },
      {
        type: 'paragraph',
        text: 'The top floor departs from the typical layout, adding a shared "Penthouse Lounge" amenity and front/rear terraces in addition to the two penthouse units.',
      },
      { type: 'label', text: 'Observations' },
      {
        type: 'list',
        items: [
          'A shared amenity space on the same floor as private penthouse units — and reachable by the same single elevator that serves the rest of the building — means the access-control credentialing for the top floor must distinguish between "resident of S01/S02" and "any resident authorized to use the lounge." If the lounge is available to all building residents, elevator access to the 5th floor cannot simply be restricted to penthouse owners; a secondary control (lounge-specific card reader, or a lobby/vestibule separating the lounge from the two penthouse entries) will be needed once the space moves to working drawings.',
          'The penthouse terraces, per the building section, sit directly above the 4th-floor units. The same vertical-alignment concern raised in 2.5 applies here with added weight: unauthorized roof/terrace access to the penthouse level is a higher-value target and should receive the strictest anti-climb and perimeter-edge detailing on the building.',
        ],
      },

      {
        type: 'heading',
        level: 3,
        text: '2.7 Building section (parking level, floor-to-floor stacking)',
      },
      {
        type: 'paragraph',
        text: 'The building section confirms a below-grade or semi-enclosed parking level beneath the ground floor, shown with multiple vehicle stalls, stacked above by the five residential floors and a rooftop terrace.',
      },
      { type: 'label', text: 'Observations' },
      {
        type: 'list',
        items: [
          'Enclosed or semi-enclosed parking is statistically one of the highest-risk zones in multi-family residential buildings for assault, vehicle break-in, and loitering, precisely because it combines low natural surveillance, multiple concealment points (columns, parked vehicles), and direct connection to the vertical circulation core identified in Section 2.4.',
          'No lighting levels, CCTV coverage, emergency call points, or pedestrian/vehicle separation are indicated for this level. This is the single highest-priority zone in the entire concept for target-hardening and electronic surveillance measures, and should be flagged for dedicated design attention independent of the rest of this review.',
          'The parking level’s direct connection to the single stair/elevator core means a hardened, monitored transition point (turnstile, card reader, or attended point) between parking and the residential core is strongly recommended.',
        ],
      },

      { type: 'heading', level: 3, text: '2.8 Building elevations (front and side)' },
      {
        type: 'paragraph',
        text: 'The front and side elevations confirm floor-to-ceiling glazing and balconies on every level, with substantial palm landscaping at grade along both elevations.',
      },
      { type: 'label', text: 'Observations' },
      {
        type: 'list',
        items: [
          'Extensive glazing toward the beach is a natural-surveillance asset — occupied units passively overlook the pool, terrace, and beach approach at all hours, which is a genuine deterrent to loitering and unauthorized beach-to-property transition (reinforcing the concern raised in Section 2.2, but also partially mitigating it).',
          'Ground-level landscaping shown in both elevations is dense enough, as rendered, to obscure direct sightlines from ground-floor units and the lobby toward the building perimeter at certain points. This should be revisited at landscape-design stage with CPTED planting principles (low ground cover under 2 feet, clear trunks/canopy above 6 feet — the "2-and-6 rule") rather than left to aesthetic massing alone.',
          'The side elevation shows the full height of the stair/elevator core as a solid vertical element with limited glazing — appropriate for structural and privacy reasons, but it means this core has no natural surveillance from outside the building; monitoring must be entirely electronic (CCTV/access control) rather than passive.',
        ],
      },

      { type: 'heading', level: 3, text: '2.9 Specifications review' },
      {
        type: 'paragraph',
        text: 'The specifications sheet lists: concrete structure, impact-resistant glass and doors, porcelain/natural stone flooring, high-end kitchen and bath fixtures, smart-home readiness, energy-efficient systems, backup generator, and fire sprinkler system.',
      },
      { type: 'label', text: 'Observations' },
      {
        type: 'list',
        items: [
          'Impact-resistant glazing and a concrete structure are strong target-hardening baselines and reduce forced-entry risk building-wide, particularly for the ground-floor units identified in Section 2.3 as elevated risk.',
          'The backup generator supports continuity of any electronic security systems (CCTV, access control, emergency lighting) during power loss — a meaningful resilience asset, provided security systems are in fact tied to the emergency power circuit at electrical design stage.',
          'Conspicuously absent from this list is any reference to CCTV, access control/card readers, intercom/visitor management, perimeter lighting, or security staffing. This is not necessarily a design flaw — a specifications sheet at concept-marketing stage is not the same as a security systems narrative — but it means electronic security and lighting design have not yet been integrated into this concept and should be a required deliverable before the project advances past schematic design.',
        ],
      },

      { type: 'heading', level: 2, text: '3. Findings summary by CPTED principle' },

      { type: 'heading', level: 3, text: 'Natural surveillance' },
      {
        type: 'list',
        items: [
          'Strength: extensive beach-facing glazing and balconies on every level provide strong passive observation of the pool, terrace, and beach approach.',
          'Weakness: dense ground-level landscaping as rendered may obstruct sightlines at the approach and parking areas; the vertical circulation core and parking level have no natural surveillance and depend entirely on electronic systems not yet specified.',
        ],
      },

      { type: 'heading', level: 3, text: 'Natural access control' },
      {
        type: 'list',
        items: [
          'Weakness: no defined single point of entry, reception/concierge control, or vehicle gate is shown. A single shared elevator/stair core serves parking through penthouse with no indicated tiered credentialing, and possible balcony stacking may allow vertical circulation to be bypassed entirely.',
        ],
      },

      { type: 'heading', level: 3, text: 'Territorial reinforcement' },
      {
        type: 'list',
        items: [
          'Weakness: the public beach transitions directly into the private pool/terrace with no symbolic or physical boundary — the most significant territorial gap identified in this review.',
        ],
      },

      { type: 'heading', level: 3, text: 'Maintenance & management' },
      {
        type: 'paragraph',
        text: 'Not assessable from concept drawings; flagged for future review once an operations/maintenance plan exists (landscaping upkeep directly affects the natural-surveillance findings above).',
      },

      { type: 'heading', level: 3, text: 'Target hardening' },
      {
        type: 'list',
        items: [
          'Strength: concrete structure and impact-resistant glazing/doors building-wide.',
          'Weakness: ground-floor units and the parking level warrant additional hardening beyond the building-wide baseline given their elevated exposure.',
        ],
      },

      { type: 'heading', level: 3, text: 'Legitimate activity support' },
      {
        type: 'list',
        items: [
          'Strength: amenity rooms flanking the lobby and the penthouse lounge, if well-used, add "eyes on" activity that supports surveillance goals; their circulation and credentialing logic should be finalized as noted in Section 2.6.',
        ],
      },

      { type: 'heading', level: 2, text: '4. Prioritized recommendations' },

      {
        type: 'label',
        text: 'Design-stage priorities (before construction documents are finalized)',
      },
      {
        type: 'numbered',
        items: [
          'Introduce a defined symbolic or physical boundary at the beach-to-pool/terrace transition without eliminating the "direct beach access" feature.',
          'Confirm balcony alignment across floors on structural elevations; introduce offset geometry or anti-climb railing detailing if stacking is confirmed, with the penthouse level as highest priority.',
          'Establish a security systems narrative (CCTV, access control, intercom/visitor management, lighting) as a required deliverable, tied into the generator’s emergency circuit.',
          'Define a staffed or card-controlled reception point in the ground-floor lobby.',
        ],
      },

      { type: 'label', text: 'Near-term priorities (systems design)' },
      {
        type: 'numbered',
        start: 5,
        items: [
          'Prioritize CCTV coverage and lighting design for the parking level as the highest-risk zone identified in this review.',
          'Program elevator floor-selection credentialing separately from building-entry credentialing, particularly to manage penthouse-lounge access without granting blanket 5th-floor access to all residents.',
          'Revisit landscaping plan against the 2-and-6 CPTED planting rule at all ground-floor approaches.',
        ],
      },

      { type: 'label', text: 'Long-term / operational priorities' },
      {
        type: 'numbered',
        start: 8,
        items: [
          'Develop a maintenance and management plan (lighting audits, landscaping upkeep, camera/access-control testing cadence) once the building is operational, as sustained CPTED effectiveness depends on management as much as design.',
        ],
      },

      { type: 'heading', level: 2, text: '5. Limitations' },
      {
        type: 'paragraph',
        text: 'This assessment was conducted from a single concept/marketing board comprising renderings, schematic floor plans, a building section, and a specifications list. It has not been verified against engineered architectural or electrical drawings, an actual landscaping schedule, a security systems narrative, or a site survey. Findings regarding sightlines, balcony alignment, and landscaping density are based on visual interpretation of renderings and should be confirmed against scaled drawings before being treated as final. This report should be read as a preliminary design-stage CPTED review intended to inform the next phase of design development, not as a certification of the completed building.',
      },
    ],
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return CASE_STUDIES.find((entry) => entry.slug === slug);
}
