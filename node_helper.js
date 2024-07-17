// node_helper.js
const NodeHelper = require("node_helper");
const fetch = require("node-fetch");

module.exports = NodeHelper.create({
    start: function () {
        console.log("Starting node helper for: " + this.name);
    },

    socketNotificationReceived: function (notification, payload) {
        if (notification === "FETCH_STATS") {
            this.fetchStats(payload);
        }
    },

    fetchStats: async function (category) {
        const apiUrl = `https://statsapi.mlb.com/api/v1/stats?stats=season&group=${category}`;
        try {
            const response = await fetch(apiUrl);
            const data = await response.json();
            this.sendSocketNotification("STATS_DATA", data.stats[0].splits);
        } catch (error) {
            console.error('Error fetching stats:', error);
        }
    }
});
