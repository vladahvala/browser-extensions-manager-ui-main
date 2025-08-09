// Fetching json cards
let extensionsData = []

fetch('data.json')
.then(res => res.json())
.then(data => {
  extensionsData = data;
  renderCards(extensionsData);
})
.catch(err => console.error('Error loading JSON:', err));


// Checking the switch state of the card
function getFilteredData() {
    if (activeFilter === 'Active') {
      return extensionsData.filter(ext => ext.isActive);
    } else if (activeFilter === 'Inactive') {
      return extensionsData.filter(ext => !ext.isActive);
    }
    return extensionsData;
  }


function renderCards(data) {
    const container = document.getElementById('cards-container');
    container.innerHTML = ''; 

    // Inserting info cards into card container
    data.forEach(ext => {
    const card = document.createElement('div');
    card.classList.add('card');

    card.innerHTML = `
        <div class="card-top">
        <img src="${ext.logo}" alt="${ext.name} logo" class="card-image">
        <div class="card-top-text">
            <span class="app-name">${ext.name}</span>
            <p class="app-description">${ext.description}</p>
        </div>
        </div>
        <div class="buttons-container">
        <button class="remove-button">Remove</button>
        <label class="switch">
            <input class="switch-button" type="checkbox" ${ext.isActive ? 'checked' : ''}>
            <span class="slider"></span>
        </label>
        </div>
    `;

        // Removing card
        const removeBtn = card.querySelector('.remove-button');
            removeBtn.addEventListener('click', () => {
            card.remove(); // Deletes the card from DOM
        });

        // Switching toggle handler
        card.querySelector('.switch-button').addEventListener('change', e => {
            ext.isActive = e.target.checked;
            setTimeout(() => {
                renderCards(getFilteredData());
            }, 400);
        });  

    container.appendChild(card);
    });
}


// Handling active/inactive tabs
const ALlTab = document.getElementById('all-tab');
const ActiveTab = document.getElementById('active-tab');
const InactiveTab = document.getElementById('inactive-tab');

const tabs = document.querySelectorAll('.tabs');
const allTabStyles = {
  bg: '#f15c58',
  color: '#050b23',
  border: 'transparent'
};

setActiveTab(ALlTab);  // All is active by default
renderCards(extensionsData);


// Checking the theme
function isDarkTheme() {
    return document.body.classList.contains('dark-theme');
}


// Updating tab styles according to theme
function updateTabColorsBasedOnTheme() {
    const isDark = isDarkTheme();
    allTabStyles.color = isDark ? '##050b23' : 'white';
    allTabStyles.bg = isDark ? '#f15c58' : '#c3271f';
}

function setActiveTab(tabElement) {
    
  updateTabColorsBasedOnTheme();

  // Reset all tabs
  tabs.forEach(t => {
    t.style.backgroundColor = '';
    t.style.color = '';
    t.style.borderColor = '';
  });

  // Apply active styles
  tabElement.style.backgroundColor = allTabStyles.bg;
  tabElement.style.color = allTabStyles.color;
  tabElement.style.borderColor = allTabStyles.border;

  activeFilter = tabElement.textContent.trim();
}

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const type = tab.textContent.trim();

    setActiveTab(tab);

    if (type === 'All') {
      renderCards(extensionsData);
    } else if (type === 'Active') {
      renderCards(extensionsData.filter(ext => ext.isActive));
    } else if (type === 'Inactive') {
      renderCards(extensionsData.filter(ext => !ext.isActive));
    }
  });
});

const themeBtn = document.querySelector('.theme-button');
const Sun = document.querySelector('.logo-sun');
const Moon = document.querySelector('.logo-moon');

const textPath = document.getElementById('text-path');


// Updating the theme icon
function updateThemeIcon() {
    const isDark = isDarkTheme();
    if (isDark) {
        Moon.style.display = 'none';
        Sun.style.display = 'flex';
    } else {
        Moon.style.display = 'flex';
        Sun.style.display = 'none';
    }
}

// Switching themes
themeBtn.addEventListener('click', () => {

  document.body.classList.toggle('dark-theme');
  updateThemeIcon();

  const activeTab = [...tabs].find(tab => tab.style.backgroundColor === allTabStyles.bg);
  if (activeTab) setActiveTab(activeTab);
});



