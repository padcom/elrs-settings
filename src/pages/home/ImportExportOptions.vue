<template>
  <Panel>
    <SectionHeader>Import/Export</SectionHeader>
    <ActionsPanel>
      <Button type="secondary" small @click="download()">Save model configuration file</Button>
      <UploadButton type="primary" small @upload="upload($event)">
        Upload model configuration file
      </UploadButton>
    </ActionsPanel>
  </Panel>
</template>

<script lang="ts" setup>
import Panel from '@/components/Panel.vue'
import SectionHeader from './components/SectionHeader.vue'
import ActionsPanel from '@/components/ActionsPanel.vue'
import Button from '@/components/Button.vue'
import UploadButton from '@/components/UploadButton.vue'

import { useAlert } from '@/composables/alert'
import { downloadBlob } from '@/lib/file-download'

const { show } = useAlert()

async function download() {
  const response = await fetch(`/config?export`)
  if (response.ok) {
    const data = await response.blob()
    downloadBlob('models.json', new Blob([data]))
  } else {
    show({ type: 'error', title: 'Error downloading configuration', message: response.statusText })
  }
}

function upload(files: FileList) {
  console.log('Uploading', files)
}
</script>
