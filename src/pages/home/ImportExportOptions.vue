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

import { useConfig } from '@/composables/config'
import { useAlert } from '@/composables/alert'
import { downloadBlob } from '@/lib/file-download'

const { download: downloadConfig } = useConfig()
const { error } = useAlert()

async function download() {
  const result = await downloadConfig()
  if (result.status === 'ok' && result.data) {
    downloadBlob('models.json', new Blob([result.data]))
  } else {
    error('Error downloading configuration', result.msg)
  }
}

function upload(files: FileList) {
  console.log('Uploading', files)
}
</script>
