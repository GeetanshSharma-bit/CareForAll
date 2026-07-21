document.addEventListener("DOMContentLoaded", () => {
    // 1. CLEANUP
    const mapDiv = document.getElementById('map');
    if (mapDiv && mapDiv._leaflet_id) {
        mapDiv._leaflet_id = null; 
    }

    // 2. Initialize Map (Sleek CartoDB Theme)
    const map = L.map('map').setView([26.2389, 73.0243], 13);
    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        attribution: '© OpenStreetMap, © CARTO'
    }).addTo(map);

    let routingControl = null;
    let myLat = 26.2389;
    let myLng = 73.0243;

    // 3. User Location with Glowing Pulse
    map.locate({setView: true, maxZoom: 14}); 
    
    map.on('locationfound', function(e) {
        myLat = e.latlng.lat;
        myLng = e.latlng.lng;
        
        const userIcon = L.divIcon({
            html: '<div class="user-pulse"></div>',
            iconSize: [18, 18],
            iconAnchor: [9, 9]
        });

        L.marker(e.latlng, {icon: userIcon}).addTo(map)
            .bindPopup("<b>📍 You are here!</b>").openPopup();
    });

    map.on('locationerror', function(e) {
        console.warn("Location access timed out or denied. Defaulting to Jodhpur center.");
    });

   // 4. Fetch Hospitals and Build UI
   // 4. Fetch Hospitals and Build UI
    fetch('api/hospitals')
        .then(response => response.json())
        .then(data => {
            const hospitals = Array.isArray(data) ? data : Object.values(data);
            
            hospitals.forEach((hospital, index) => {
                
                // A. THE UPGRADE: Premium SVG Pin Graphic
                const hospitalSVG = `
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="36" height="36" style="filter: drop-shadow(0px 4px 6px rgba(0,0,0,0.3)); transform: translateY(-5px);">
                    <path d="M16 2C9.4 2 4 7.4 4 14c0 7.5 12 16 12 16s12-8.5 12-16c0-6.6-5.4-12-12-12z" fill="#3182ce"/>
                    <circle cx="16" cy="13" r="6" fill="white"/>
                    <path d="M15 10h2v2h2v2h-2v2h-2v-2h-2v-2h2v-2z" fill="#e53e3e"/>
                </svg>`;

                const hospitalIcon = L.divIcon({
                    html: hospitalSVG,
                    className: '', 
                    iconSize: [36, 36],
                    iconAnchor: [18, 36],
                    popupAnchor: [0, -32] 
                });

                const marker = L.marker([hospital.lat, hospital.lng], {icon: hospitalIcon}).addTo(map);
                marker.bindPopup(`<b>${hospital.name}</b>`);

                // B. Create Sidebar Card with Animation
                const card = document.createElement('div');
                card.className = 'hospital-card';
                card.style.animationDelay = `${index * 0.05}s`; 
                card.innerHTML = `
                    <h3>${hospital.name}</h3>
                    <p style="color: #718096; font-size: 0.85rem; margin-top: 4px;">Click to view route</p>
                `;

                // C. THE FIX: Reusable Routing Function
                const drawRoute = () => {
                    map.flyTo([hospital.lat, hospital.lng], 15);

                    if (routingControl) {
                        map.removeControl(routingControl);
                    }

                    if (typeof L.Routing !== 'undefined') {
                        routingControl = L.Routing.control({
                            waypoints: [
                                L.latLng(myLat, myLng), 
                                L.latLng(hospital.lat, hospital.lng)
                            ],
                            createMarker: function() { return null; }, 
                            show: false,                               
                            routeWhileDragging: false,
                            addWaypoints: false
                        }).addTo(map);

                        routingControl.on('routingerror', function(err) {
                            console.error("Routing Engine Error:", err);
                        });
                    }
                };

                // D. Attach routing to BOTH the Card and the Map Marker
                card.addEventListener('click', drawRoute);
                marker.on('click', drawRoute);

                // E. AUTO-ROUTING LOGIC (From Home Page Click)
                const urlParams = new URLSearchParams(window.location.search);
                const targetHospital = urlParams.get('target');

                if (targetHospital && hospital.name === targetHospital) {
                    // Wait 1.5 seconds for GPS and Map to load, then draw route
                    setTimeout(() => {
                        drawRoute();
                        marker.openPopup(); 
                    }, 1500);
                }

                // F. Append to Sidebar
                const listContainer = document.getElementById('hospitalList');
                if (listContainer) {
                    listContainer.appendChild(card);
                }
            });
        })
        .catch(error => console.error("Data Fetch Error:", error));
}); // <-- End of DOMContentLoaded