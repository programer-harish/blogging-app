import Keycloak from "keycloak-js";

// if (!initialized) {
    const keycloak = new Keycloak({
        url: 'http://localhost:8081/',
        realm: 'inventorydev',
        clientId: 'inventory_client'
    });
// }

export default keycloak;