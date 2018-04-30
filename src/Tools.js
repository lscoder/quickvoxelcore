/**
 * Know if the current environment is webGL2 compatible.
 * Usage:
 * ```Javascript
 * if (!quickvoxelcore.webGL2()){
 *   alert( 'Quickvoxel Core cannot run here because this web browser is not compatible with WebGL2.' )
 * } else {
 *   // call the main app
 * }
 * ```
 * @return {Boolean} true if compatible with WebGL2, false if not
 */
export function webGL2 () {
  var dummyGL = document.createElement("canvas").getContext("webgl2")
  return !!dummyGL;
}