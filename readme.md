![](./assets/images/qv_logo_horizontal.png)

**Quickvoxel Core** is a pure Javascript toolkit for volumetric visualization of neuro files in the web browser. Everything that happens in Quickvoxel is strictly client-side, without the need of an active server (i.e. can run on a Github page)

Features:
- Open and decodes **NIfTI**, **MINC2**, and **MGH** (experimental)
- Display volume in world/subject coordinates to align registered volumes
- **Obliques**
- Can **blend** two volumes with different methods
- Apply **colormaps**  ([44 available](http://www.pixpipe.io/pixpipejs/examples/colormap.html))
- Adjust **contrast** and **brightness**

Requirement:
- A modern web browser, compatible with WebGL2 (recent Chrome or Firefox)

Quickvoxel Core is backed by [Pixpipe](https://github.com/Pixpipe/pixpipejs) for decoding volume files and process the data, and by [BabylonJS](https://www.babylonjs.com/) for the WebGL2 rendering.

Since this project is a **core only**, it is not bound to any frontend framework and needs to be sugar coated with some UI elements to provide a proper user interaction. You can find a minimal 10-lines example [here](http://www.pixpipe.io/quickvoxelcore/examples/simple.html) ([source](https://github.com/Pixpipe/quickvoxelcore/blob/master/examples/simple.html)).  
A lot of additional methods to do more interesting things with *Quickvoxel* are implemented in the core and need to be tied to UI element to be fully usable. We'll see that in the following part.

# Demo
(Most of the demos are less than 30 lines)
- [Simple with loading from URL](http://www.pixpipe.io/quickvoxelcore/examples/simple.html) - [source](https://github.com/Pixpipe/quickvoxelcore/blob/master/examples/simple.html)
- [Simple with loading from URL, with a loading spinner and events](http://www.pixpipe.io/quickvoxelcore/examples/simpleSpinner.html) - [source](https://github.com/Pixpipe/quickvoxelcore/blob/master/examples/simpleSpinner.html)
- [Simple with loading from a local file](http://www.pixpipe.io/quickvoxelcore/examples/simpleFile.html) - [source](https://github.com/Pixpipe/quickvoxelcore/blob/master/examples/simpleFile.html)
- [Translate the plane](http://www.pixpipe.io/quickvoxelcore/examples/translate.html) - [source](https://github.com/Pixpipe/quickvoxelcore/blob/master/examples/translate.html)
- [Oblique plane](http://www.pixpipe.io/quickvoxelcore/examples/oblique.html) - [source](https://github.com/Pixpipe/quickvoxelcore/blob/master/examples/oblique.html)
- [Show/hide axes](http://www.pixpipe.io/quickvoxelcore/examples/axes.html) - [source](https://github.com/Pixpipe/quickvoxelcore/blob/master/examples/axes.html)
- [With colormaps](http://www.pixpipe.io/quickvoxelcore/examples/colormaps.html) - [source](https://github.com/Pixpipe/quickvoxelcore/blob/master/examples/colormaps.html)
- [Oblique plane, animated](http://www.pixpipe.io/quickvoxelcore/examples/oblique2.html) - [source](https://github.com/Pixpipe/quickvoxelcore/blob/master/examples/oblique2.html)
- [Two volumes + blending + colormap](http://www.pixpipe.io/quickvoxelcore/examples/double.html) - [source](https://github.com/Pixpipe/quickvoxelcore/blob/master/examples/double.html)
- [Two volumes + blending + colormap + loading spinner](http://www.pixpipe.io/quickvoxelcore/examples/doubleSpinner.html) - [source](https://github.com/Pixpipe/quickvoxelcore/blob/master/examples/doubleSpinner.html)
- [+ time series animated](http://www.pixpipe.io/quickvoxelcore/examples/time.html) - [source](https://github.com/Pixpipe/quickvoxelcore/blob/master/examples/time.html)
- [+ animated translation](http://www.pixpipe.io/quickvoxelcore/examples/doubleTranslate.html) - [source](https://github.com/Pixpipe/quickvoxelcore/blob/master/examples/doubleTranslate.html)
- [+ animated oblique](http://www.pixpipe.io/quickvoxelcore/examples/doubleRotate.html) - [source](https://github.com/Pixpipe/quickvoxelcore/blob/master/examples/doubleRotate.html)
- [Changing cameras automatically (simple)](http://www.pixpipe.io/quickvoxelcore/examples/doubleTranslateCameraCrew.html) - [source](https://github.com/Pixpipe/quickvoxelcore/blob/master/examples/doubleTranslateCameraCrew.html)
- [Changing cameras and having view control](http://www.pixpipe.io/quickvoxelcore/examples/chosecamera.html) - [source](https://github.com/Pixpipe/quickvoxelcore/blob/master/examples/chosecamera.html)

In addition [QuickGui](http://me.jonathanlurie.fr/quickgui/public/) ([source](https://github.com/jonathanlurie/quickgui)) is a more advanced project, developed for the ***#BrainHack2018*** in Montreal. It uses some features of Quickvoxel Core with a simple and accessible UI.

# API documentation
[HERE](http://www.pixpipe.io/quickvoxelcore/doc/)


# Install
Since **Quickvoxel Core** will most likely be used as a dependency, it can be used in multiple ways:

**From a simple HTML page:**
```html
<!-- ES6 version -->
<script src="quickvoxelcore/dist/quickvoxelcore.es6.js"></script>

<!-- or ES5 version -->
<script src="quickvoxelcore/dist/quickvoxelcore.js"></script>

<!-- or ES5 minified version -->
<script src="quickvoxelcore/dist/quickvoxelcore.min.js"></script>
```

**From another ES module:**
```bash
npm install quickvoxelcore --save
```

Then, from your module:
```javascript
// import the ES5 version
import quickvoxelcore from 'quickvoxelcore'

// or import the ES6 version
import quickvoxelcore from 'quickvoxelcore/dist/quickvoxelcore.es6.js'
```

# How To
## Getting started
To start, *QuickvoxelCore* needs an HTML5 canvas element:
```html
<html>
<head>
  <title>QuickvoxelCore Test</title>

  <style>
  body {
    overflow: hidden;
    width: 100%;
    height: 100%;
    margin: 0;
  }

  #renderCanvas {
    width: 100%;
    height: 100%;
  }
  </style>

</head>
<body>
  <script src="../dist/quickvoxelcore.es6.js"></script>

  <canvas id="renderCanvas"></canvas>

  <script>
    let canvas = document.getElementById("renderCanvas")
    // ...
  </script>

</body>
</html>
```

No matter the way you pick (simple HTML page or ES module to be bundled), the features are accessible from the `quickvoxelcore` namespace:
```javascript
let canvas = document.getElementById("renderCanvas")

let qvc = new quickvoxelcore.QuickvoxelCore( canvas )
```

The constructor `quickvoxelcore.QuickvoxelCore(...)` initializes several internal objects, three important ones can then be fetched:
- the `VolumeCollection`
- the `RenderEngine`
- the `CameraCrew`

```javascript
// ...

let qvc = new quickvoxelcore.QuickvoxelCore( canvas )

let volumeCollection = qvc.getVolumeCollection()
let renderEngine = qvc.getRenderEngine()
let camcrew = qvc.getCameraCrew()
```

Though, before launching your main app, if can be nice to check if QuickvoxelCore is running in a WebGL2 compatible environment. We have a function for that:
```javascript
// test compatibility with WebGL2
if (!quickvoxelcore.webGL2()){
  alert( 'Quickvoxel Core cannot run here because this web browser is not compatible with WebGL2.' )
} else {
  // launch your app here
}
```

## Interlude: the VolumeCollection
The `VolumeCollection` instance allows you to add new volume from file URL or from a file dialog. Once added, a volume file will automatically:
- be given a unique ID within the collection
- be parsed by Pixpipe
- create a 3D texture for later display

The methods you will use from your `VolumeCollection` instance are:
- `.addVolumeFromUrl( String )` to add a volume from a URL
- `.addVolumeFromFile( File)` to add a volume from a file in the local filesystem

In addition, `VolumeCollection` provides some events so that actions can be triggered during the lifecycle of a `Volume`:
- `volumeAdded` is called when the volume is parsed and added to the collection. But its webGL texture is not ready yet! The callbacks attached to this event will have the volume object as argument.
- `volumeReady`called after `volumeAdded`, at the moment the added volume has its WegGL 3D texture ready. At this stage, a volume is ready to be displayed.The callbacks attached to this event will have the volume object as argument.
- `volumeRemoved` is called when a volume is removed from the collection with the method `.removeVolume(id)`. The callbacks attached to this event will have the volume id (string) as argument.
- `errorAddingVolume` is called when a volume failed to be added with `.addVolumeFromUrl()` and `.addVolumeFromFile()`. The callbacks attached to this event will have the url or the HTML5 File object as argument.

To each event can be attached multiple callbacks, they will simply be called successively in the order the were declared. To associate a callback function to an event, just do:

```javascript
myVolumeCollection.on("volumeReady", function(volume){
    // Do something with this volume
})
```
In general, events are most likely to be defined from the main scope or from where you also have access to the `RenderEngine` instance.

VolumeCollection has plenty of methods, get the full description [here](http://www.pixpipe.io/quickvoxelcore/doc/#volumecollection). You may also want to check the documentation of the Volume class [here](http://www.pixpipe.io/quickvoxelcore/doc/#volume).

## Interlude: the RenderEngine
The `RenderEngine` instance is in charge of displaying the volume from the collection, once they are loaded. It also comes with all the features to rotates/translates the three orthogonal planes (referred as `_planeSystem` in the source), apply a colormaps, change brightness/contrast and deal with blending.

A `RenderEngine` can display only 2 volumes at the same time. The terminology used in the doc and source is
> Two **slots** are available to **mount** volumes on the render engine. Those slots are called **primary** and **secondary**.

Then, some volume can be *unmounted* from a given slot and another volume from the volume collection can be *mounted*.

Rendering features such as **colormap**, **contrast** and **brightness** are associated to *slots* and not to *volumes*. This means, if you use the *primary* slot to mount a structural MRI and the *secondary* slot to mount a functional MRI, and then adjust the brightness/contrast/colormap of the secondary slot, mounting another fMRI instead of the one in place will not change those settings.
*Note: there are plans to add a additional volume for masking*

RenderEngine has plenty of other methods, get the full description [here](http://www.pixpipe.io/quickvoxelcore/doc/#renderengine)

## Interlude: The CameraCrew
The `CameraCrew` instance is automatically created at the instanciation of the `QuickvoxelCore` object. The purpose of the *cameracrew* is to provide an interface for camera and point of view manipulation.  
The default camera in QuickvoxelCore is the **perspective** camera, but three additional orthographic cameras are provided:
- one always facing the **coronal** plane
- one always facing the **sagittal** plane
- one always facing the **axial** plane

When the orthogonal planes are rotated, the orthographic cameras associated are also rotated to be always facing their respective plane.
Each orthogonal camera can independently be zoomed in/out, translated and rotated.

To change the camera, the method `.defineCamera()` from the `CameraCrew` instance must be called. Though, multiple camera naming are possible:
- after **generic names**: `'aOrtho'`, `'bOrtho'` and `'cOrtho'`. Those names where made generic because they don't imply a specific direction, even though before any rotation happen, *aOrtho* looks toward *x*, *bOrtho* looks towards *y* and *cOrtho* looks toward *z*.
- after **generic short names**: `'a'`, `'b'` and `'c'`, same logic as above
- after their **dominant axis names**: `'x'`, `'y'` and `'z'`. This method is convenient because the names are dynamically associated with camera *a*, *b* and *c* depending on the dominant direction they are looking at and this association is reevaluated at every ortho plane rotation. For example, at first and before any plane rotation is performed, the *x* camera **is** the *a* camera. After some rotations, the *a* camera is probably no longer looking towards the *x* direction, then if we need the camera that looks toward *x*, we can no longer select the *a* camera for that. This is why this *axis naming* is important.
- after the **anatomical names**, this is the same as *dominant axis names* but using a semantic neuroscientist are more used to: `'sagittal'` (always toward *x*), `'coronal'` (always toward *y*) and `'axial'` (always towards *z*). Note that this relation between the anatomical names and the axis names is established by the MNI space conventions.

In addition to those names, two other are possible:
- `'main'` is the perspective camera
- `'current'` is the current camera being used

Of course the *current* keyword is not useful in the context of `.defineCamera()` but it is very handy when it comes to modifying the setting of a camera, i.e. no need to remember if we are changing the *zoom* setting of this or that camera, we are changing it on *current*.

Here is an example of how to change the camera:
```javascript
// ...
let qvc = new quickvoxelcore.QuickvoxelCore( canvas )
let camcrew = qvc.getCameraCrew()

camcrew.defineCamera('coronal')
// ...
```
CameraCrew has plenty of other methods, get the full description [here](http://www.pixpipe.io/quickvoxelcore/doc/#cameracrew).


## Mount a volume once it's ready
Here is how to load a volume from a URL (that has to comply with CORS, i.e. be in the same server as Quickvoxel)

```javascript
// ...

volumeCollection.addVolumeFromUrl( "./data/structural.nii.gz" );

// mount the volume when it's ready!
volumeCollection.on("volumeReady", function(volume){
  // to mount the loaded volume on a specific engine slot.
  // (if a volume is already on this slot, it's unmounted and replaced by the new one)
  renderEngine.mountVolumeN( 0, volume )

  // OR, you can just mount it on the first slot available
  let couldMount = renderEngine.mountVolumeOnFirstEmptySlot( volume )

  if( !couldMount ){
    console.log("All volume slots are taken on the render engine, make some space before rendering this volume.");
  }
})

```

Alternatively, a volume can be loaded from you filesystem using a file dialog. Look at the [example here](https://github.com/Pixpipe/quickvoxelcore/blob/master/examples/simpleFile.html). Then, the logic for mounting on a slot is the same.


# Going Further
The `RenderEngine` object has a lot of methods that can be used to tweak your visualization. Do no hesitate to consult the [API doc conserning the RenderEngine](http://www.pixpipe.io/quickvoxelcore/doc/#renderengine) to make sure you use them properly.  

Here is a list of what you can do:
- show/hide a volume mounted on a slot
- change the blending method between two volumes
- mount/unmount a volume on/from a given slot
- apply a colormap on a given slot
- get the list of colormaps names and corresponding canvas for UI purpose
- display a reversed colormap
- change the brightness on a given slot
- change the contrast on a given slot
- change the time index of a volume on a given slot (time series)
- rotate with a relative angle around the normal of a plane from the plane system (1 plane remains fixed)
- translate along the normal of a plane from the plane system
- apply an absolute rotation in world coordinates Euler angles
- set the position of the plane system in absolute world coordinates
- [experimental] change the position of the camera (incomplete, `up` vector needs to be set too)


# TODO
In what is probably the order of future developments:
- [ ] Masking capabilities (as a 3rd slot that has special features)
- [ ] Raycasting capabilities, then we can get the position where the mouse pointer is hitting (and then the intensity in the volume, etc)
- [ ] Try to build 3D textures without having to perform a conversion from float32 to uint8
- [ ] Have a split view options with the 4 camera (3 orthos + 1 perspective)
- [ ] Add a collection of meshes
- [ ] Add a collection of point clouds
- [x] Check if WebGL2 is enabled
- [x] Add 3 cameras that are always facing each of the ortho planes
- [x] Gives the possibility to change the camera
- [x] Add method to automatically position a camera along the *dominant* X Y or Z
- [x] Add XYZ axis of a grid system to know where we are
- [x] Add a method to force the main (perspective) camera to follow the center of the plane system
- [x] Add events for when a volume asked to be loaded so that UI can display a spinner or something
- [x] Add anatomical names for camera ('sagittal', 'axial', 'coronal')
- [x] Add a link to source to each example
- [x] Add examples for multi camera usage
- [x] Toggle axes
