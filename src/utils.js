/**
 * @author emmanuelolaojo
 * @since 11/11/18
 */

export {checkParams, getMax, getMin}

/**
 * Validates the configuration object.
 *
 * @param config - configuration object
 */
function checkParams(config){
  if(!config.container) error("container");
  if(!config.items && !config.static) error("items or static")
}


function error(prop){
  throw new Error(`Missing property '${prop}' in MagicGrid config`);
}

/**
 * Finds the longest column in
 * a column list
 *
 * @param cols - list of columns
 *
 * @return longest column
 */
function getMax(cols){
  let max = cols[0];

  for(let col of cols){
    if(col.height > max.height){
      max = col
    }
  }

  return max;
}

/**
 * Finds the longest column in
 * a column list
 *
 * @param cols - list of columns
 *
 * @return longest column
 */
function getMin(cols){
  let min = cols[0];

  for(let col of cols){
    if(col.height < min.height){
      min = col
    }
  }

  return min;
}