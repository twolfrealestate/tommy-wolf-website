export interface FaqItem { q: string; a: string }
export interface FaqSection { title: string; items: FaqItem[] }

const daybreakFaq: FaqSection[] = [
  {
    title: 'HOA Structure',
    items: [
      {
        q: 'Who manages the Daybreak HOA?',
        a: 'The Daybreak Community Association (DCA) is the master HOA, professionally managed by CCMC. It handles common area landscaping, maintenance, facility management, design review, and accounting. Some neighborhoods also have sub-associations managed by separate companies including Densley Management, FCS Management, Treo Management, Evolution Community Management, and Mihi Management.',
      },
      {
        q: 'What are the three main organizations in Daybreak?',
        a: '(1) Daybreak Communities — the developer, handles new parks, facilities, and development. (2) Daybreak Community Association (DCA) — the HOA, manages daily operations, standards, and amenities. (3) LiveDAYBREAK — an independent non-profit focused on events and community programming, funded by enhancement fees, not HOA dues.',
      },
      {
        q: 'What is a sub-association?',
        a: 'Sub-associations govern specific buildings or complexes — typically townhomes and condos — and charge fees on top of the DCA Master Association. They have their own boards, governing documents, and fees covering exterior maintenance, landscaping, snow removal, insurance, and reserves.',
      },
      {
        q: 'What is a Benefited Service Area (BSA)?',
        a: "A BSA is a home category that receives specific shared services (like snow removal on shared driveways or exclusive amenity access) and pays an additional fee for those services on top of the master assessment.",
      },
    ],
  },
  {
    title: 'Assessments & Fees',
    items: [
      {
        q: 'How much are Daybreak HOA fees?',
        a: "As of 2026, the DCA Master Association quarterly assessment is $433.50 for most homeowners (~$144.50/month), which includes Quantum Fiber internet. Homes in Founder's Village Phase 1 pay $334.50/quarter (internet not included). Townhome and condo residents also pay sub-association fees ranging from ~$213–$450+/month on top of this.",
      },
      {
        q: 'When are dues due?',
        a: 'Quarterly on January 1, April 1, July 1, and October 1. Pay by the 15th to avoid late fees.',
      },
      {
        q: 'How can I pay?',
        a: 'Online resident portal, mail/drop-off check, or direct debit. For monthly payment plans: dcapayhelp@ccmcnet.com. Billing questions: (801) 254-8062.',
      },
      {
        q: 'Can I pay my Master Association and sub-association with the same check?',
        a: 'No — they must be paid separately. Funds cannot be transferred between accounts.',
      },
      {
        q: 'What is the community enhancement fee?',
        a: "A one-time 0.5% of sale price paid by the seller at closing to fund LiveDAYBREAK programming. I include this in every seller's net sheet.",
      },
      {
        q: 'Are fees negotiable?',
        a: 'No. Assessment rates are non-negotiable and charged to every unit regardless of type or location.',
      },
    ],
  },
  {
    title: 'Amenities',
    items: [
      {
        q: "What's included in the DCA assessment?",
        a: 'Quantum Fiber internet (500 Mbps), five community pools + splash pad, Daybreak Community Center (gym, indoor track, basketball, pool), Oquirrh Lake access, the Watercourse, watercraft rentals, 50+ miles of trails, dozens of parks, outdoor sport courts, and seasonal community garden plots.',
      },
      {
        q: 'How do I access amenities?',
        a: 'Pick up an amenity card at the Daybreak Community Center, 4544 W. Harvest Moon Drive. Guests need a temporary amenity pass.',
      },
      {
        q: 'Can I use my kayak on Oquirrh Lake?',
        a: 'Yes, with a seasonal permit ($12/year per watercraft). Swimming and wading in the lake are not permitted due to water quality preservation.',
      },
      {
        q: 'How does the Quantum Fiber internet work?',
        a: "500 Mbps Fiber-to-the-Home included in most homeowners' HOA assessment through a bulk agreement. Call (866) 316-1975 and identify yourself as a Daybreak Bulk HOA customer. Founder's Village Phase 1 is excluded — those homeowners choose their own provider.",
      },
    ],
  },
  {
    title: 'Community Rules',
    items: [
      {
        q: "Do I need approval to change my home's exterior?",
        a: 'Yes. All exterior modifications and landscaping changes require Design Review Committee approval before work begins. Applications at mydaybreak.com.',
      },
      {
        q: 'Can I park my boat or RV at home?',
        a: 'Allowed on streets/driveways for up to 24 hours in any four-day period. Long-term storage is prohibited. RV/boat storage available through Daybreak Communities — email RVlot@daybreakcommunities.com.',
      },
      {
        q: 'Can I rent out my home?',
        a: 'Yes, with restrictions. Must owner-occupy for 12 consecutive months first. Minimum lease: 30 days. Short-term rentals (Airbnb/VRBO) are prohibited and enforced.',
      },
      {
        q: 'What is the 12-month no-resale rule?',
        a: 'Buyers sign an affidavit at closing agreeing not to sell within 12 months. Exceptions: death, divorce, 60+ mile job transfer. Fine: $25,000.',
      },
      {
        q: 'Who handles snow removal?',
        a: 'South Jordan City plows public streets. Single-family homeowners clear their driveways, walks, and adjacent sidewalks. Some sub-associations include snow removal in their assessment.',
      },
      {
        q: 'Who do I contact for maintenance issues?',
        a: 'Common areas: DCA (801) 254-8062 / mydaybreak.com. Roads/lights: sjc.utah.gov/service-request. Utilities: utility company directly. Home warranty: your homebuilder.',
      },
    ],
  },
  {
    title: 'Schools & Community',
    items: [
      {
        q: 'What schools serve Daybreak?',
        a: 'Jordan School District schools: Daybreak Elementary (K-6), Eastlake Elementary (K-6), Golden Fields Elementary (K-6), Copper Mountain Middle (7-9), Mountain Creek Middle (7-9), Herriman High (10-12). Charters: Early Light Academy (K-9), American Academy of Innovation (6-12). Private: Daybreak Academy (Pre-K to 3rd + daycare). Verify boundaries at planning.jordandistrict.org/boundaries/',
      },
      {
        q: 'Is there public transit?',
        a: 'TRAX Red Line has three stops in Daybreak as of 2025. The newest (March 2025) serves Downtown Daybreak directly. Commute to downtown SLC is ~40 minutes.',
      },
    ],
  },
  {
    title: 'General Questions',
    items: [
      {
        q: 'Is now a bad time to buy a house?',
        a: "No, not if you plan to stay at least five years and the monthly payment fits your budget. Rates are high: the 30-year fixed mortgage averaged 7.28% on October 1, 2026, according to Freddie Mac. The trade-off is less competition and more time to decide. In Daybreak in September 2026, the median sold price was $549,900, homes took a median of 46 days to sell, and sellers received 99.8% of list price. You can refinance a rate later. You cannot renegotiate a purchase price. The Daybreak Market Pulse page on this site has the current numbers.",
      },
      {
        q: 'How much do I need for a down payment?',
        a: "Most buyers need 3% to 5% down, not 20%. Conventional loans start at 3% for first-time buyers and 5% for most others. FHA loans require 3.5% with a credit score of 580 or higher. VA loans require 0% for eligible veterans and service members. On a $550,000 home, that is $16,500 at 3%, $19,250 at 3.5%, and $110,000 at 20%. Putting less than 20% down on a conventional loan adds private mortgage insurance, which can be removed once you reach 20% equity. Utah Housing Corporation also offers down payment assistance to buyers who qualify. Budget for closing costs separately.",
      },
      {
        q: 'Can I buy a house with student loans?',
        a: "Yes. Student loans do not disqualify you from a mortgage. Lenders look at your debt-to-income ratio, which is your total monthly debt payments divided by your gross monthly income. Most loan programs want that ratio at or below roughly 43% to 50%, with the new house payment included. If your loans are deferred or on an income-driven plan with a $0 payment, lenders often still count a payment, usually 0.5% to 1% of the balance per month depending on the loan type. A record of on-time student loan payments helps your credit score. A lender can run your exact numbers in one phone call.",
      },
      {
        q: 'How to know if a house is overpriced?',
        a: "Compare it to recent sold homes, not to other active listings. A house is likely overpriced if its price per square foot sits well above three to six similar homes that sold nearby in the last 90 days, if it has been on the market longer than the area median, or if the price has already been reduced. In Daybreak, village, lot, age, and HOA fees all change the number, so compare within the same neighborhood. The Daybreak Market Pulse page on this site shows current price per square foot and days on market. I run this comparison, called a comparative market analysis, for every buyer before we write an offer.",
      },
      {
        q: 'What credit score do I need to buy a house?',
        a: "You need a 620 credit score for most conventional loans and a 580 for an FHA loan with 3.5% down. FHA allows scores from 500 to 579 with 10% down, though few lenders approve them. VA loans have no official minimum, but most lenders want 580 to 620. Jumbo loans usually require 700 or higher. A higher score lowers your interest rate and your mortgage insurance cost, and the best conventional pricing typically starts around 740. Check your score with a lender before you start touring homes. Small fixes, like paying down a credit card balance, can raise it within a month or two.",
      },
      {
        q: 'What are the hidden costs of buying a house?',
        a: "The biggest cost beyond the down payment is closing costs, which typically run 2% to 4% of the loan amount. Also plan for a home inspection (about $400 to $600), an appraisal (about $500 to $700), prepaid property taxes and homeowner's insurance, and moving costs. Earnest money, usually 1% to 2% of the price, is due with your offer and is credited back to you at closing. After closing, budget for HOA dues, utilities, and about 1% of the home's value per year for maintenance. In Daybreak, the master HOA assessment is $433.50 per quarter in 2026, and townhomes and condos add a sub-association fee of roughly $213 to $450 or more per month.",
      },
      {
        q: 'First time home buyer, where do I start?',
        a: "Start with a lender pre-approval, before you look at a single house. It tells you how much you can borrow, what the monthly payment will be, and which loan programs and down payment assistance you qualify for. From there: (1) set a monthly payment you are comfortable with, which may be lower than what you are approved for, (2) choose an agent who knows the area, (3) tour homes and compare neighborhoods, (4) make an offer, (5) complete the inspection and appraisal, and (6) close. In Utah, it usually takes 30 to 45 days to go from an accepted offer to getting the keys. Pre-approval takes a day or two and usually costs nothing.",
      },
      {
        q: 'Are we making a mistake buying now?',
        a: "Usually not, if three things are true: you plan to stay at least five years, the full monthly payment fits your budget with room to spare, and you will still have an emergency fund after closing. Buying tends to be a mistake when one of those is missing, not because of the month you bought in. Nobody can time rates or prices reliably. What you can control is the payment, the house, and the location. If rates fall later, you can refinance. If you are unsure, I am happy to go through your numbers with you and tell you honestly if waiting makes more sense.",
      },
    ],
  },
]

export default daybreakFaq
