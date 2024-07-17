// MMM-MLBStats.js
Module.register("MMM-MLBStats", {
    defaults: {
        updateInterval: 10 * 60 * 1000, // 10 minutes
        initialCategory: 'hitting'
    },

    start: function () {
        this.stats = [];
        this.category = this.config.initialCategory;
        this.sendSocketNotification("FETCH_STATS", this.category);
        this.scheduleUpdate();
    },

    scheduleUpdate: function () {
        setInterval(() => {
            this.sendSocketNotification("FETCH_STATS", this.category);
        }, this.config.updateInterval);
    },

    getStyles: function () {
        return ["MMM-MLBStats.css"];
    },

    getDom: function () {
        const wrapper = document.createElement("div");
        wrapper.innerHTML = `
            <h1>MLB Season Stats</h1>
            <div class="buttons">
                <button id="hittingButton">Hitting</button>
                <button id="pitchingButton">Pitching</button>
                <button id="fieldingButton">Fielding</button>
            </div>
            <div class="header" id="stats-header">Hitting</div>
            <div class="grid-container" id="stats-container"></div>
        `;

        this.addButtonListeners(wrapper);

        if (this.stats.length > 0) {
            this.updateDomContent(wrapper);
        }

        return wrapper;
    },

    addButtonListeners: function (wrapper) {
        wrapper.querySelector("#hittingButton").addEventListener("click", () => {
            this.category = 'hitting';
            this.sendSocketNotification("FETCH_STATS", this.category);
        });
        wrapper.querySelector("#pitchingButton").addEventListener("click", () => {
            this.category = 'pitching';
            this.sendSocketNotification("FETCH_STATS", this.category);
        });
        wrapper.querySelector("#fieldingButton").addEventListener("click", () => {
            this.category = 'fielding';
            this.sendSocketNotification("FETCH_STATS", this.category);
        });
    },

    updateDomContent: function (wrapper) {
        const statsContainer = wrapper.querySelector("#stats-container");
        const statsHeader = wrapper.querySelector("#stats-header");
        statsContainer.innerHTML = '';

        statsHeader.textContent = this.category.charAt(0).toUpperCase() + this.category.slice(1);

        const statsToShow = this.getStatsToShow();

        statsToShow.forEach(stat => {
            const statContainer = document.createElement('div');
            statContainer.className = 'stat-container';

            const table = document.createElement('table');
            table.className = 'stat-table';

            const headerRow = document.createElement('tr');
            const statHeader = document.createElement('th');
            statHeader.colSpan = 3;
            statHeader.textContent = stat.name;
            statHeader.onclick = () => this.toggleVisibility(stat.key);
            headerRow.appendChild(statHeader);
            table.appendChild(headerRow);

            const header = document.createElement('tr');
            const rankHeader = document.createElement('th');
            rankHeader.textContent = 'Rank';
            const playerHeader = document.createElement('th');
            playerHeader.textContent = 'Player';
            const valueHeader = document.createElement('th');
            valueHeader.textContent = stat.name;
            header.appendChild(rankHeader);
            header.appendChild(playerHeader);
            header.appendChild(valueHeader);
            table.appendChild(header);

            const sortedPlayers = [...this.stats].sort((a, b) => parseFloat(b.stat[stat.key]) - parseFloat(a.stat[stat.key])).slice(0, 5);

            sortedPlayers.forEach((player, index) => {
                const row = document.createElement('tr');
                row.className = index > 0 ? 'hidden' : '';
                row.id = `${stat.key}-${index}`;
                const rankCell = document.createElement('td');
                rankCell.textContent = index + 1;
                const playerCell = document.createElement('td');
                playerCell.textContent = player.player.fullName;
                const valueCell = document.createElement('td');
                valueCell.textContent = player.stat[stat.key];
                row.appendChild(rankCell);
                row.appendChild(playerCell);
                row.appendChild(valueCell);
                table.appendChild(row);
            });

            statContainer.appendChild(table);
            statsContainer.appendChild(statContainer);
        });
    },

    getStatsToShow: function () {
        if (this.category === 'hitting') {
            return [
                { key: 'gamesPlayed', name: 'Games Played' },
                { key: 'groundOuts', name: 'Ground Outs' },
                { key: 'airOuts', name: 'Air Outs' },
                { key: 'runs', name: 'Runs' },
                { key: 'doubles', name: 'Doubles' },
                { key: 'triples', name: 'Triples' },
                { key: 'homeRuns', name: 'Home Runs' },
                { key: 'strikeOuts', name: 'Strike Outs' },
                { key: 'baseOnBalls', name: 'Base on Balls' },
                { key: 'intentionalWalks', name: 'Intentional Walks' },
                { key: 'hits', name: 'Hits' },
                { key: 'avg', name: 'Batting Average' },
                { key: 'atBats', name: 'At Bats' },
                { key: 'obp', name: 'On Base Percentage' },
                { key: 'slg', name: 'Slugging Percentage' },
                { key: 'ops', name: 'On-base Plus Slugging' },
                { key: 'stolenBases', name: 'Stolen Bases' },
                { key: 'plateAppearances', name: 'Plate Appearances' },
                { key: 'rbi', name: 'RBIs' }
            ];
        } else if (this.category === 'pitching') {
            return [
                { key: 'wins', name: 'Wins' },
                { key: 'losses', name: 'Losses' },
                { key: 'earnedRunAverage', name: 'ERA' },
                { key: 'strikeOuts', name: 'Strike Outs' },
                { key: 'baseOnBalls', name: 'Base on Balls' },
                { key: 'hits', name: 'Hits Allowed' },
                { key: 'inningsPitched', name: 'Innings Pitched' },
                { key: 'gamesPlayed', name: 'Games Played' },
                { key: 'gamesStarted', name: 'Games Started' },
                { key: 'completeGames', name: 'Complete Games' },
                { key: 'shutouts', name: 'Shutouts' },
                { key: 'saves', name: 'Saves' },
                { key: 'holds', name: 'Holds' }
            ];
        } else if (this.category === 'fielding') {
            return [
                { key: 'assists', name: 'Assists' },
                { key: 'putOuts', name: 'Put Outs' },
                { key: 'errors', name: 'Errors' },
                { key: 'chances', name: 'Chances' },
                { key: 'fielding', name: 'Fielding Percentage' },
                { key: 'doublePlays', name: 'Double Plays' },
                { key: 'gamesPlayed', name: 'Games Played' },
                { key: 'rangeFactorPerGame', name: 'Range Factor per Game' },
                { key: 'rangeFactorPer9Inn', name: 'Range Factor per 9 Innings' }
            ];
        }
    },

    toggleVisibility: function (statKey) {
        for (let i = 1; i < 5; i++) {
            const row = document.getElementById(`${statKey}-${i}`);
            if (row) {
                row.classList.toggle('hidden');
            }
        }
    },

    socketNotificationReceived: function (notification, payload) {
        if (notification === "STATS_DATA") {
            this.stats = payload;
            this.updateDom();
        }
    }
});
