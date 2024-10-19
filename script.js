// Sample data (replace with real data from APIs or other sources)
const candidates = [
    { name: "Donald Trump", party: "Republican", image: "images/donald_trump.jpg" },
    { name: "Kamala Harris", party: "Democratic", image: "images/kamala_harris.jpg" },
];

const issues = [
    "Economy and Jobs",
    "Healthcare",
    "Climate Change",
    "Education",
    "Foreign Policy",
];

const timelineEvents = [
    { date: "June 2024", event: "Primary Elections" },
    { date: "July 2024", event: "Party Conventions" },
    { date: "September 2024", event: "Presidential Debates" },
    { date: "November 5, 2024", event: "Election Day" },
];

// Populate candidate information
function populateCandidates() {
    const candidateCards = document.getElementById("candidate-cards");
    candidates.forEach(candidate => {
        const card = document.createElement("div");
        card.className = "candidate-card";
        card.innerHTML = `
            <img src="${candidate.image}" alt="${candidate.name}">
            <h3>${candidate.name}</h3>
            <p>${candidate.party}</p>
        `;
        candidateCards.appendChild(card);
    });
}

// Populate key issues
function populateIssues() {
    const issuesList = document.getElementById("issues-list");
    issues.forEach(issue => {
        const li = document.createElement("li");
        li.textContent = issue;
        issuesList.appendChild(li);
    });
}

// Populate election timeline
function populateTimeline() {
    const timeline = document.getElementById("timeline");
    timelineEvents.forEach(event => {
        const div = document.createElement("div");
        div.className = "timeline-event";
        div.innerHTML = `
            <p><strong>${event.date}</strong></p>
            <p>${event.event}</p>
        `;
        timeline.appendChild(div);
    });
}

const trumpPolicies = [
    "Seal the border and stop the migrant invasion",
    "Carry out the largest deportation operation in American history",
    "End inflation, and make America affordable again",
    "Make America the dominant energy producer in the world, by far!",
    "Stop outsourcing, and turn the United States into a manufacturing superpower",
    "Large tax cuts for workers, and no tax on tips!",
    "Defend our Constitution, our Bill of Rights, and our fundamental freedoms",
    "Prevent World War Three, restore peace in Europe and in the Middle East",
    "End the weaponization of government against the American people",
    "Stop the migrant crime epidemic, demolish the foreign drug cartels",
    "Rebuild our cities, including Washington DC",
    "Strengthen and modernize our military",
    "Keep the U.S. dollar as the world's reserve currency",
    "Fight for and protect Social Security and Medicare with no cuts",
    "Cancel the electric vehicle mandate and cut costly regulations",
    "Cut federal funding for schools pushing critical race theory",
    "Keep men out of women's sports",
    "Deport pro-Hamas radicals and make our college campuses safe",
    "Secure our elections",
    "Unite our country by bringing it to new and record levels of success"
];

const harrisPolicies = [
    "Opportunity Economy: Lowering costs for families and creating economic opportunities",
    "Healthcare: Ensuring affordable healthcare for all",
    "Climate Change: Tackling climate change with sustainable solutions",
    "Education: Investing in education and making college more affordable",
    "Justice: Reforming the criminal justice system",
    "Voting Rights: Protecting and expanding voting rights",
    "Immigration: Creating a fair and humane immigration system",
    "Gun Safety: Implementing common-sense gun safety measures",
    "Foreign Policy: Strengthening alliances and promoting democracy globally",
    "Women's Rights: Protecting reproductive rights and promoting gender equality"
];

function populatePolicies(candidateId, policies) {
    const policyList = document.getElementById(`${candidateId}-policy-list`);
    policies.forEach(policy => {
        const li = document.createElement("li");
        li.textContent = policy;
        policyList.appendChild(li);
    });
}

function initializeTabs() {
    const tabs = document.querySelectorAll('.tab-button');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            const candidate = tab.dataset.candidate;
            document.querySelectorAll('.policy-list').forEach(list => {
                list.classList.remove('active');
            });
            document.getElementById(`${candidate}-policies`).classList.add('active');
        });
    });
}

// Initialize the dashboard
function initDashboard() {
    populateCandidateDetails();
    populateIssues();
    populateTimeline();
    populatePolicies('trump', trumpPolicies);
    populatePolicies('harris', harrisPolicies);
    initializeTabs();
    updateCountdown();
    populateCampaignContributions();
    handleResponsiveLayout();
    window.addEventListener("resize", handleResponsiveLayout);
    createUSAMap();
}

// Run initialization when the DOM is loaded
document.addEventListener("DOMContentLoaded", initDashboard);

// Countdown timer function
function updateCountdown() {
    const electionDate = new Date("November 5, 2024 00:00:00").getTime();
    const now = new Date().getTime();
    const timeLeft = electionDate - now;

    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    document.getElementById("countdown-timer").innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;

    if (timeLeft < 0) {
        clearInterval(countdownTimer);
        document.getElementById("countdown-timer").innerHTML = "Election Day has arrived!";
    }
}

// Start the countdown timer
const countdownTimer = setInterval(updateCountdown, 1000);

// OpenFEC API configuration
const FEC_API_KEY = 'PSaqGNK0dUu9bLBDQ4fkfQOXusU2sDq9d2CXTyAB';
const FEC_API_BASE_URL = 'https://api.open.fec.gov/v1/';

// Candidate FEC IDs (replace with actual IDs for the 2024 election)
const candidateFecIds = {
    'Donald Trump': 'P80001571',
    'Kamala Harris': 'P00009423'
};

async function fetchTopContributors(candidateId) {
    try {
        const response = await axios.get(`${FEC_API_BASE_URL}schedules/schedule_a/by_contributor/`, {
            params: {
                api_key: FEC_API_KEY,
                candidate_id: candidateId,
                sort: '-total',
                per_page: 3
            }
        });
        return response.data.results;
    } catch (error) {
        console.error('Error fetching top contributors:', error.response ? error.response.data : error.message);
        return [];
    }
}

async function populateCampaignContributions() {
    const contributionCards = document.getElementById('contribution-cards');
    contributionCards.innerHTML = ''; // Clear existing content
    
    for (const [candidateName, fecId] of Object.entries(candidateFecIds)) {
        const contributors = await fetchTopContributors(fecId);
        
        const card = document.createElement('div');
        card.className = 'contribution-card';
        
        let contributorList = '<ul class="contributor-list">';
        contributors.forEach(contributor => {
            contributorList += `<li>${contributor.contributor_name}: $${contributor.total.toLocaleString()}</li>`;
        });
        contributorList += '</ul>';
        
        card.innerHTML = `
            <h3>${candidateName}</h3>
            <p>Top 3 Corporate Contributors:</p>
            ${contributorList}
        `;
        
        contributionCards.appendChild(card);
    }
}

async function fetchCandidateDetails(candidateId) {
    try {
        const response = await axios.get(`${FEC_API_BASE_URL}candidate/${candidateId}/`, {
            params: {
                api_key: FEC_API_KEY
            }
        });
        return response.data.results[0];
    } catch (error) {
        console.error('Error fetching candidate details:', error);
        return null;
    }
}

async function fetchCandidateFinancials(candidateId) {
    try {
        const response = await axios.get(`${FEC_API_BASE_URL}candidate/${candidateId}/totals/`, {
            params: {
                api_key: FEC_API_KEY,
                sort: '-cycle',
                per_page: 1
            }
        });
        return response.data.results[0];
    } catch (error) {
        console.error('Error fetching candidate financials:', error);
        return null;
    }
}

async function populateCandidateDetails() {
    const candidateCards = document.getElementById("candidate-cards");
    candidateCards.innerHTML = ''; // Clear existing content

    for (const [candidateName, fecId] of Object.entries(candidateFecIds)) {
        const details = await fetchCandidateDetails(fecId);
        const financials = await fetchCandidateFinancials(fecId);
        
        if (details && financials) {
            const card = document.createElement("div");
            card.className = "candidate-card";
            card.innerHTML = `
                <img src="images/${candidateName.toLowerCase().replace(' ', '_')}.jpg" alt="${candidateName}">
                <div class="candidate-info-text">
                    <h3>${candidateName}</h3>
                    <p><strong>Total Receipts:</strong> $${financials.receipts.toLocaleString()}</p>
                    <p><strong>Total Disbursements:</strong> $${financials.disbursements.toLocaleString()}</p>
                    <p><strong>Cash on Hand:</strong> $${financials.last_cash_on_hand_end_period.toLocaleString()}</p>
                </div>
            `;
            candidateCards.appendChild(card);
        }
    }
}

// Add this function to handle responsive layouts
function handleResponsiveLayout() {
    const width = window.innerWidth;
    const candidateCards = document.getElementById("candidate-cards");
    const timeline = document.getElementById("timeline");

    if (width <= 768) {
        candidateCards.style.flexDirection = "column";
        timeline.style.flexDirection = "column";
    } else {
        candidateCards.style.flexDirection = "row";
        timeline.style.flexDirection = "row";
    }
}

// Update the earlyVotingData array with specific dates
const earlyVotingData = [
    { state: 'Alabama', start: null, details: 'Alabama does not have early voting.' },
    { state: 'Alaska', start: new Date(2024, 9, 21), details: 'Early voting starts on October 21, 2024' },
    { state: 'Arizona', start: new Date(2024, 9, 9), details: 'Early voting starts on October 9, 2024' },
    // Add the rest of the states with their specific early voting start dates
    // Use null for states without early voting
    // Example:
    // { state: 'California', start: new Date(2024, 9, 7), details: 'Early voting starts on October 7, 2024' },
    // ...
];

// Function to create the USA map
function createUSAMap() {
    const mapContainer = document.getElementById('map-container');
    
    // Load the USA map SVG
    fetch('usa-map.svg')
        .then(response => response.text())
        .then(svgData => {
            mapContainer.innerHTML = svgData;
            
            // Add event listeners to each state
            const states = document.querySelectorAll('.state');
            states.forEach(state => {
                state.addEventListener('mouseover', showTooltip);
                state.addEventListener('mouseout', hideTooltip);
            });
        });
}

// Function to show tooltip
function showTooltip(event) {
    const stateName = event.target.id.replace('_', ' ');
    const stateData = earlyVotingData.find(data => data.state === stateName);
    
    if (stateData) {
        const tooltip = document.createElement('div');
        tooltip.id = 'tooltip';
        
        let content = `<strong>${stateName}</strong><br>`;
        if (stateData.start) {
            const options = { year: 'numeric', month: 'long', day: 'numeric' };
            const formattedDate = stateData.start.toLocaleDateString('en-US', options);
            content += `Early voting starts on ${formattedDate}`;
        } else {
            content += stateData.details;
        }
        
        tooltip.innerHTML = content;
        
        document.body.appendChild(tooltip);
        
        const rect = event.target.getBoundingClientRect();
        tooltip.style.left = `${rect.left + window.scrollX}px`;
        tooltip.style.top = `${rect.bottom + window.scrollY}px`;
        
        setTimeout(() => tooltip.style.opacity = 1, 0);
    }
}

// Function to hide tooltip
function hideTooltip() {
    const tooltip = document.getElementById('tooltip');
    if (tooltip) {
        tooltip.style.opacity = 0;
        setTimeout(() => tooltip.remove(), 300);
    }
}
