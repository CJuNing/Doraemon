{
    dataLoaded(self){ 
      var rangeMaps = {
        "亏损面":{
          "color":"green",
          "range":[50, 100]
        }
      };
  
      self.rowData.forEach(row => {
        for(let columnName in row) {
          // 这个是列名
          if(columnName !== "INDCT_LABEL") {
            let value = Number(row[columnName]);
            let {color, range} = rangeMaps[row['INDCT_LABEL']]
  
            if(range[0]<=value && value <=range[1]) {
              row[columnName] = `<span style="color:${color}">${value}</span>`;
            }else{
              let  _color = color == "green" ? "red" : "green"
              row[columnName] = `<span style="color:${_color}">${value}</span>`;
            } // if
            
          } // if
          
        } // for
        
      }); // forEach
    }
  }
    