<template>
	<div class="flex-container">
		<ecad-viewer-embedded url="http://localhost:8000/video/video.kicad_pcb">
		</ecad-viewer-embedded>
		<ecad-viewer-embedded url="http://localhost:8000/video/video.glb">
		</ecad-viewer-embedded>
		<ecad-viewer-embedded url="http://localhost:8000/video/video.kicad_sch;
      http://localhost:8000/video/bus_pci.kicad_sch;
      http://localhost:8000/video/esvideo.kicad_sch;
      http://localhost:8000/video/graphic.kicad_sch;
      http://localhost:8000/video/modul.kicad_sch;
      http://localhost:8000/video/muxdata.kicad_sch;
      http://localhost:8000/video/pal-ntsc.kicad_sch;
      http://localhost:8000/video/rams.kicad_sch">
		</ecad-viewer-embedded>
	</div>

</template>

<style>
ecad-viewer,
ecad-viewer-embedded {
	width: 100%;
	height: 800px;
	border: 1px solid cyan;
	margin: 5px;
}

.flex-container {
	display: flex;
	margin-top: 60px;
	margin-left: 10%;
	margin-right: 10%;
	flex-direction: column;
}

.col-flex-container {
	display: flex;
	flex-direction: column;
}

.canvas-container {
	margin: 10px;
	padding: 1px;
}
</style>

<script>
import "../../static/ecadViewer"
import "../../static/html_utils"
export default {
	data() {
		return {
			title: 'Hello'
		}
	},
	onLoad() {

	},
	methods: {

	}
}
</script>