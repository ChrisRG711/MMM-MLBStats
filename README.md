# MMM-MLBStats

Simple MagicMirror module to display various MLBStats, which ones are configurable and there are buttons built in to change what category is displayed

![image](https://github.com/user-attachments/assets/3723db07-97ed-4290-99bb-9aeb056ab1a3)


Sample config file entry

{
            
            module: "MMM-MLBStats",
            position: "middle_center",  // You can choose any position like "top_right", "bottom_left", etc.
            config: {
                updateInterval: 10 * 60 * 1000,  // Update interval in milliseconds (10 minutes)
                initialCategory: 'hitting'       // Initial stat category to display ("hitting", "pitching", or "fielding")
            
            }
},
