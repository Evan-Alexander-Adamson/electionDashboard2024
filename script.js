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

// Policy data
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

// Function to populate policies
function populatePolicies(candidateId, policies) {
    const policyList = document.getElementById(`${candidateId}-policy-list`);
    if (policyList) {
        policyList.innerHTML = ''; // Clear existing policies
        policies.forEach(policy => {
            const li = document.createElement("li");
            li.textContent = policy;
            policyList.appendChild(li);
        });
    }
}

// Function to initialize tabs
function initializeTabs() {
    const tabs = document.querySelectorAll('.tab-button');
    const candidateImage = document.querySelector('#current-candidate-image img');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs
            tabs.forEach(t => t.classList.remove('active'));
            // Add active class to clicked tab
            tab.classList.add('active');
            
            // Hide all policy lists
            document.querySelectorAll('.policy-list').forEach(list => {
                list.classList.remove('active');
            });
            
            // Show selected policy list
            const candidate = tab.dataset.candidate;
            document.getElementById(`${candidate}-policies`).classList.add('active');
            
            // Update the image based on selected candidate
            if (candidate === 'trump') {
                candidateImage.src = 'https://raw.githubusercontent.com/your-username/your-repo/main/donald_trump.jpg';
                candidateImage.alt = 'Donald Trump';
            } else {
                candidateImage.src = 'https://raw.githubusercontent.com/your-username/your-repo/main/kamala_harris.jpg';
                candidateImage.alt = 'Kamala Harris';
            }
        });
    });
}

// Initialize the dashboard
function initDashboard() {
    // Remove populateCandidateDetails() call
    populatePolicies('trump', trumpPolicies);
    populatePolicies('harris', harrisPolicies);
    initializeTabs();
    updateCountdown();
    populateCampaignContributions();
    createEarlyVotingDropdown();
    createVotingChart();
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

    const countdownTimer = document.getElementById("countdown-timer");
    if (countdownTimer) {
        if (timeLeft < 0) {
            countdownTimer.innerHTML = "<span>Election Day has arrived!</span>";
        } else {
            countdownTimer.innerHTML = `
                <span>${days}d</span>
                <span>${hours}h</span>
                <span>${minutes}m</span>
                <span>${seconds}s</span>
            `;
        }
    }
}

// Start the countdown timer
setInterval(updateCountdown, 1000);

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
    if (!contributionCards) return; // Add check for element existence
    
    contributionCards.innerHTML = ''; // Clear existing content
    
    const customContributions = {
        'Kamala Harris': [
            { contributor_name: 'MICHAEL BLOOMBERG', total: 19000000, details: 'BLOOMBERG INC., NEW YORK, NY 10150' },
            { contributor_name: 'ERIC SCHMIDT', total: 1600000, details: 'ALPHABET INC., PALO ALTO, CA 94301 (Former CEO of Google)' },
            { contributor_name: 'REID HOFFMAN', total: 7000000, details: 'CEO LINKEDIN' }
        ],
        'Donald Trump': [
            { contributor_name: 'TIMOTHY MELLON', total: 7000000, details: 'GULF OIL' },
            { contributor_name: 'LINDA MCMAHON', total: 16000000, details: 'SPOUSE OF VINCE MCMAHON' },
            { contributor_name: 'DIANE HENDRICKS', total: 6300000, details: 'COFOUNDER ABC SUPPLY' }
        ]
    };
    
    Object.entries(customContributions).forEach(([candidateName, contributors]) => {
        const card = document.createElement('div');
        card.className = 'contribution-card';
        
        let contributorList = '<ul class="contributor-list">';
        contributors.forEach(contributor => {
            contributorList += `
                <li>
                    <strong>${contributor.contributor_name}</strong>: $${contributor.total.toLocaleString()}<br>
                    <small>${contributor.details}</small>
                </li>`;
        });
        contributorList += '</ul>';
        
        card.innerHTML = `
            <h3>${candidateName}</h3>
            <p>Top Campaign Contributors:</p>
            ${contributorList}
        `;
        
        contributionCards.appendChild(card);
    });
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

// Add this function to handle responsive layouts
function handleResponsiveLayout() {
    const width = window.innerWidth;
    const candidateCards = document.getElementById("candidate-cards");
    if (width <= 768) {
        if (candidateCards) candidateCards.style.flexDirection = "column";
    } else {
        if (candidateCards) candidateCards.style.flexDirection = "row";
    }
}

// Update the earlyVotingData array with specific dates
const earlyVotingData = [
    { state: 'Alabama', details: 'Alabama does not have early voting.' },
    { state: 'Alaska', details: 'Varies by location, but 15 days before Election Day.' },
    { state: 'Arizona', details: '27 days before Election Day.' },
    { state: 'Arkansas', details: '15 days before Election Day for the preferential primary and general election; 7 days before Election Day for all other elections.' },
    { state: 'California', details: '29 days before Election Day. Varies by county.' },
    { state: 'Colorado', details: '15 days before Election Day (in-person voting centers, may vary by county).' },
    { state: 'Connecticut', details: '15 days before Election Day.' },
    { state: 'Delaware', details: 'At least 10 days before Election Day.' },
    { state: 'District of Columbia', details: 'Varies, but not more than 12 days before Election Day.' },
    { state: 'Florida', details: 'At least 10 days before Election Day. Varies by county.' },
    { state: 'Georgia', details: 'The fourth Monday before Election Day or if a state holiday, the next day.' },
    { state: 'Hawaii', details: '10 business days before Election Day (all mail-in voting).' },
    { state: 'Idaho', details: 'The third Monday before Election Day.' },
    { state: 'Illinois', details: '40 days before Election Day.' },
    { state: 'Indiana', details: '28 days before Election Day.' },
    { state: 'Iowa', details: '20 days before Election Day (in-person absentee voting).' },
    { state: 'Kansas', details: 'Up to 20 days before Election Day but no later than one week before Election Day.' },
    { state: 'Kentucky', details: '5 days before Election Day.' },
    { state: 'Louisiana', details: '14 days before Election Day (but 18 days before Election Day for the presidential election).' },
    { state: 'Maine', details: '30 days before Election Day (in-person absentee).' },
    { state: 'Maryland', details: 'The second Thursday before Election Day.' },
    { state: 'Massachusetts', details: '17 days before Election Day for the General Election.' },
    { state: 'Michigan', details: 'The second Saturday prior to Election Day.' },
    { state: 'Minnesota', details: '46 days before Election Day (in-person absentee voting).' },
    { state: 'Mississippi', details: '45 days before Election Day for eligible absentee voters.' },
    { state: 'Missouri', details: 'The second Tuesday before Election Day (in-person no-excuse absentee voting).' },
    { state: 'Montana', details: '30 days before Election Day (in-person absentee voting).' },
    { state: 'Nebraska', details: '30 days before Election Day.' },
    { state: 'Nevada', details: '17 days before Election Day.' },
    { state: 'New Hampshire', details: 'N/A. New Hampshire does not offer in-person early or no-excuse absentee voting.' },
    { state: 'New Jersey', details: '10 days before the General Election.' },
    { state: 'New Mexico', details: '28 days before Election Day.' },
    { state: 'New York', details: '10 days before Election Day.' },
    { state: 'North Carolina', details: 'The third Thursday before Election Day.' },
    { state: 'North Dakota', details: 'At least 15 days before Election Day.' },
    { state: 'Ohio', details: '29 days before Election Day.' },
    { state: 'Oklahoma', details: 'Thursday before Election Day for primary elections; Wednesday before Election Day for general elections.' },
    { state: 'Oregon', details: 'N/A. Oregon has all mail-in ballots.' },
    { state: 'Pennsylvania', details: 'Varies by county. Absentee and mail-in ballot applications available up to 50 days before Election Day.' },
    { state: 'Rhode Island', details: '20 days before Election Day.' },
    { state: 'South Carolina', details: '15 days before Election Day.' },
    { state: 'South Dakota', details: '46 days before Election Day (in-person absentee voting).' },
    { state: 'Tennessee', details: '20 days before Election Day.' },
    { state: 'Texas', details: '17 days before Election Day.' },
    { state: 'Utah', details: '14 days before Election Day.' },
    { state: 'Vermont', details: '45 days before Election Day.' },
    { state: 'Virginia', details: '45 days before Election Day (in-person absentee voting).' },
    { state: 'Washington', details: '18 days before Election Day.' },
    { state: 'West Virginia', details: '13 days before Election Day.' },
    { state: 'Wisconsin', details: 'No earlier than 14 days before Election Day.' },
    { state: 'Wyoming', details: '28 days before Election Day (in-person absentee voting).' },
];

// Function to create and populate the dropdown
function createEarlyVotingDropdown() {
    const dropdownContainer = document.getElementById('early-voting-dropdown-container');
    
    // Create dropdown container
    const dropdownWrapper = document.createElement('div');
    dropdownWrapper.className = 'early-voting-dropdown';
    
    // Create label
    const label = document.createElement('label');
    label.htmlFor = 'state-select';
    label.textContent = 'Select your state: ';
    
    // Create select element
    const select = document.createElement('select');
    select.id = 'state-select';
    
    // Add default option
    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.textContent = '-- Select a state --';
    select.appendChild(defaultOption);
    
    // Add options for each state
    earlyVotingData.forEach(state => {
        const option = document.createElement('option');
        option.value = state.state;
        option.textContent = state.state;
        select.appendChild(option);
    });
    
    // Create info display div
    const infoDisplay = document.createElement('div');
    infoDisplay.id = 'early-voting-info';
    infoDisplay.className = 'early-voting-info';
    
    // Add event listener to select
    select.addEventListener('change', function() {
        const selectedState = earlyVotingData.find(state => state.state === this.value);
        if (selectedState) {
            infoDisplay.innerHTML = `<strong>${selectedState.state}:</strong> ${selectedState.details}`;
        } else {
            infoDisplay.textContent = '';
        }
    });
    
    // Append elements to the container
    dropdownWrapper.appendChild(label);
    dropdownWrapper.appendChild(select);
    
    // Append container and info display to the dropdown container
    dropdownContainer.appendChild(dropdownWrapper);
    dropdownContainer.appendChild(infoDisplay);
}

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

// Add this to your script.js
const votingData = {
    labels: ['WA', 'OR', 'CA', 'AK', 'HI', 'ID', 'UT', 'NV', 'MT', 'WY', 'CO', 'AZ', 'NM', 'ND', 'SD', 'NE', 'KS', 'OK', 'TX', 'MN', 'IA', 'MO', 'AR', 'LA', 'WI', 'IL', 'IN', 'MI', 'OH', 'PA', 'WV', 'VA', 'KY', 'TN', 'MS', 'AL', 'FL', 'GA', 'SC', 'NC', 'DE', 'MD', 'NJ', 'NY', 'CT', 'RI', 'MA', 'VT', 'NH', 'ME'],
    datasets: [
        {
            label: 'Democrat (%)',
            data: [43, 43, 43, 33, 43, 20, 25, 43, 45, 35, 43, 43, 43, 30, 30, 30, 30, 30, 43, 43, 43, 43, 43, null, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43],
            backgroundColor: '#3498db',
            borderColor: '#3498db',
        },
        {
            label: 'Republican (%)',
            data: [39, 39, 39, 33, 39, 55, 55, 39, 35, 50, 39, 39, 39, 50, 50, 50, 50, 50, 39, 39, 39, 39, 39, null, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39],
            backgroundColor: '#e74c3c',
            borderColor: '#e74c3c',
        },
        {
            label: 'Other (%)',
            data: [18, 18, 18, 33, 18, 25, 20, 18, 20, 15, 18, 18, 18, 20, 20, 20, 20, 20, 18, 18, 18, 18, 18, null, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18],
            backgroundColor: '#2ecc71',
            borderColor: '#2ecc71',
        }
    ]
};

function createVotingChart() {
    const ctx = document.getElementById('earlyVotingChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: votingData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Early Voting Results by State',
                    font: {
                        size: 16,
                        weight: 'bold'
                    }
                },
                legend: {
                    position: 'top',
                }
            },
            scales: {
                x: {
                    stacked: true,
                    grid: {
                        display: false
                    }
                },
                y: {
                    stacked: true,
                    beginAtZero: true,
                    max: 100,
                    title: {
                        display: true,
                        text: 'Percentage (%)'
                    }
                }
            }
        }
    });
}

// In your createVotingVisualization function, update the animation code:

function createVotingVisualization() {
    const container = document.getElementById('visualization-container');
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, container.clientWidth / container.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ 
        antialias: false,
        powerPreference: "low-power"
    });
    
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(1);
    container.appendChild(renderer.domElement);

    camera.position.z = 15;
    camera.position.y = 8;
    camera.lookAt(0, 0, 0);

    // Set fixed position and render once
    scene.rotation.y = Math.PI * 0.5;
    renderer.render(scene, camera);

    // Cleanup
    return () => {
        renderer.dispose();
        scene.clear();
    };
}

