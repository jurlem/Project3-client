export function convertDataType (value) {
  try {
    return (new Function("return " + value + ";")())
  } 
  catch(e){
    return value;
  }
}