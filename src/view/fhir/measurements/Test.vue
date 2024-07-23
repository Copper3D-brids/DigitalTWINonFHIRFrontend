<template>
    <n-flex class="content">
        <div  style="border: #efefef solid 1px; height: calc(100vh - 200px);width: 100%;">
            <RelationGraph
                ref="graphRef"
                :options="graphOptions"
                @node-click="onNodeClick"
                @line-click="onLineClick"
            >
                <template #node="{node}">
                <div v-if="node.type === 'my-root-node'" class="my-rg-node my-root-node"><img class="my-image" :src="node.data.imageUrl"></div>
                <div v-else-if="node.type === 'my-input-node'" class="my-rg-node"><div class="my-form"><input v-model="node.text"><div style="text-align: left;">Text:{{ node.text }}</div></div></div>
                <div v-else-if="node.type === 'my-color-node'" class="my-rg-node"><input v-model="node.color" type="color" @change="onMyNodeColorChange(node, $event)"></div>
                <div v-else-if="node.type === 'my-cool-node'" class="my-rg-node my-cool-node">Not Cool</div>
                <div v-else class="my-rg-node">{{ node.text }}</div>
                </template>
            </RelationGraph>
        </div>
    </n-flex>
</template>

<script setup lang="ts">
import { NFlex} from 'naive-ui';
import { ref, onMounted } from 'vue';
import RelationGraph from 'relation-graph/vue3';
import type { RGOptions, RGJsonData, RGNode, RGLine, RGLink, RGUserEvent, RelationGraphComponent } from 'relation-graph/vue3';

const graphRef = ref<RelationGraphComponent | null>(null);
const graphOptions: RGOptions = {
    allowSwitchLineShape: true,
    allowSwitchJunctionPoint: true,
    layout: {
        layoutName: 'force',
        from: 'left',
        'min_per_width': 410,
        'min_per_height': 90,
    }
};

onMounted(() => {
    showGraph();
});

const showGraph = () => {
    const __graph_json_data:RGJsonData = {
        rootId: 'c',
        nodes: [
            { id: 'a', text: 'Pratitioner', color: '#6aa84f', nodeShape: 1, width: 100, height: 50},
            { id: 'b', text: 'Group', color: '#6aa84f', nodeShape: 1, width: 100, height: 50 },
            { id: 'c', text: 'Patient', color: '#6aa84f', nodeShape: 1, width: 100, height: 50},
            { id: 'e', text: 'Composition', color: '#6aa84f', nodeShape: 1, width: 100, height: 50 },
            { id: 'f', text: 'ImagingStudy', color: '#6aa84f', nodeShape: 1, width: 100, height: 50},
            { id: 'g', text: 'Observation', color: '#6aa84f', nodeShape: 1, width: 100, height: 50},
            // { id: 'h', text: 'ResearchStudy', color: '#4bccff', nodeShape: 1, width: 100, height: 50},
            // { id: 'i', text: 'PlanDefinition', color: '#ff9900', nodeShape: 1, width: 100, height: 50},
            // { id: 'j', text: 'Flag', color: '#ff9900', nodeShape: 1, width: 100, height: 50},
            // { id: 'k', text: 'Task', color: '#9c36b5', nodeShape: 1, width: 100, height: 50},
            // { id: 'l', text: 'Composition', color: '#9c36b5', nodeShape: 1, width: 100, height: 50},
            // { id: 'm', text: 'Observation', color: '#9c36b5', nodeShape: 1, width: 100, height: 50},
            // { id: 'n', text: 'DiagnosticReport', color: '#9c36b5', nodeShape: 1, width: 100, height: 50},
        ],
        lines: [
            { from: 'a', to: 'b', fromJunctionPoint: 'bottom', toJunctionPoint: 'top'},
            { from: 'c', to: 'b', fromJunctionPoint: 'top', toJunctionPoint: 'bottom'},
            { from: 'c', to: 'e', fromJunctionPoint: 'bottom', toJunctionPoint: 'top'},
            { from: 'f', to: 'e', fromJunctionPoint: 'top', toJunctionPoint: 'bottom'},
            { from: 'g', to: 'e', fromJunctionPoint: 'top', toJunctionPoint: 'bottom'},
            // { from: 'a', to: 'h',  text: '1...*',  color: '#555', fromJunctionPoint: 'left', toJunctionPoint: 'top'},
            // { from: 'h', to: 'b',  text: '1...1',  color: '#555', fromJunctionPoint: 'right', toJunctionPoint: 'left'},
            // { from: 'h', to: 'e',  text: '1...1',  color: '#555', fromJunctionPoint: 'bottom', toJunctionPoint: 'top'},

            // { from: 'i', to: 'j',  text: '1...*',  color: '#555', fromJunctionPoint: 'bottom', toJunctionPoint: 'top'},
            // { from: 'i', to: 'k',  text: '1...*',  color: '#555', fromJunctionPoint: 'bottom', toJunctionPoint: 'top'},
            // { from: 'a', to: 'k',  text: '1...1',  color: '#555', fromJunctionPoint: 'bottom', toJunctionPoint: 'left'},
            // { from: 'b', to: 'k',  text: '1...1',  color: '#555', fromJunctionPoint: 'right', toJunctionPoint: 'left'},
            // { from: 'c', to: 'k',  text: '1...1',  color: '#555', fromJunctionPoint: 'right', toJunctionPoint: 'left'},
            // { from: 'c', to: 'l',  text: '1...1',  color: '#555', fromJunctionPoint: 'bottom', toJunctionPoint: 'top'},
            // { from: 'k', to: 'l',  text: '1...1',  color: '#555', fromJunctionPoint: 'bottom', toJunctionPoint: 'top'},
            // { from: 'm', to: 'l',  text: '1...1',  color: '#555', fromJunctionPoint: 'top', toJunctionPoint: 'bottom'},
            // { from: 'j', to: 'm',  text: '1...1',  color: '#555', fromJunctionPoint: 'bottom', toJunctionPoint: 'top'},
            // { from: 'm', to: 'n',  text: '1...1',  color: '#555', fromJunctionPoint: 'right', toJunctionPoint: 'left'},

            // { from: 'a', to: 'g', text: 'Text 2', color: '#519633', lineShape: 1 },
            // { from: 'a', to: 'g', text: 'Text 3', color: '#519633', lineShape: 1 },
            // { from: 'f', to: 'g', text: '', color: '#519633', lineShape: 6, fromJunctionPoint: 'left', toJunctionPoint: 'left' },
            // { from: 'f', to: 'g', text: '', color: '#519633', lineShape: 6, fromJunctionPoint: 'right', toJunctionPoint: 'right' }
        ]
    };
    console.log(graphRef.value);
    const graphInstance = graphRef.value!.getInstance();
    graphInstance.setJsonData(__graph_json_data).then(() => {

        graphInstance.moveToCenter();
        graphInstance.zoomToFit();
    });
};

const onNodeClick = (nodeObject: RGNode, $event: RGUserEvent) => {
    console.log('onNodeClick:', nodeObject);
};

const onLineClick = (lineObject: RGLine, linkObject: RGLink, $event: RGUserEvent) => {
    console.log('onLineClick:', lineObject);
};
const onMyNodeColorChange = (nodeObject: RGNode, $event: RGUserEvent) => {
    console.log('onMyNodeColorChange:', nodeObject);
    const newColor = $event.target!.value;
    console.log('onMyNodeColorChange:', nodeObject.id, newColor);
    const graphInstance = graphRef.value!.getInstance();
    const rootNode = graphInstance.getNodeById('a');
    rootNode.color = newColor;
};
</script>
x``
<style lang="scss" scoped>
.my-rg-node {
  display: flex;
  place-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  box-sizing: border-box;

}

.my-cool-node {
  background-image: linear-gradient( rgba(248, 166, 8, 0.7), rgba(214, 103, 239, 0.7), rgb(168, 85, 247, 0.7));
  border-radius: 30% 90% 70% 30%/30% 30% 70% 90%;
  transform: rotate(-22deg) translateX(0px);
  border: #519633 solid 1px;
}
</style>