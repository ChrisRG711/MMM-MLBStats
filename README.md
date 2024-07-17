# MMM-MLBStats

Simple MagicMirror module to display various MLBStats, which ones are configurable and there are buttons built in to change what category is displayed

Sample config file entry

{
            
            module: "MMM-MLBStats",
            position: "middle_center",  // You can choose any position like "top_right", "bottom_left", etc.
            config: {
                updateInterval: 10 * 60 * 1000,  // Update interval in milliseconds (10 minutes)
                initialCategory: 'hitting'       // Initial stat category to display ("hitting", "pitching", or "fielding")
            
            }
},
