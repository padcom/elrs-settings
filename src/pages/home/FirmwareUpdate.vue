<template>
  <Panel>
    <SectionHeader>Firmware Update</SectionHeader>
    <p>
      Choose a file to update module firmware. Select the correct .bin file for {{ platform }}
      otherwise a bad flash may occur. If this happens you will need to recover via USB/Serial.
      You may also download the
      <a href="/firmware.bin" title="Click to download firmware">currently running firmware</a>.
    </p>

    <div class="upload">
      <UploadButton @upload="upload($event)">
        Flash firmware file
      </UploadButton>
      <progress ref="progressBar" value="0" max="100" />
    </div>
  </Panel>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

import Panel from '@/components/Panel.vue'
import SectionHeader from './components/SectionHeader.vue'
import UploadButton from '@/components/UploadButton.vue'

import { useBuildOptions } from '@/composables/build'
import { uploadFile } from '@/lib/file-upload'
import { ticker } from '@/lib/ticker'
import { useAlert } from '@/composables/alert'

const { platform } = useBuildOptions()
const progressBar = ref<HTMLProgressElement>()

interface FileUploadResult {
  status: 'ok' | 'mismatch' | 'error'
  msg?: string
}

const { question, success, error } = useAlert()

// eslint-disable-next-line complexity, max-lines-per-function
async function upload(files: FileList) {
  if (files.length === 1) {
    try {
      const result = await uploadFile<FileUploadResult>(`/update`, 'POST', files[0], e => {
        progressBar.value!.value = e.loaded * 100 / e.total
      })

      // eslint-disable-next-line max-depth
      switch (result.status) {
        case 'ok':
          // eslint-disable-next-line max-depth
          for await (const progress of ticker(0, 100, 2, 100)) {
            progressBar.value!.value = progress
          }

          await success('Update Succeeded', result.msg || 'All good!')
          break
        case 'mismatch':
          // eslint-disable-next-line max-depth
          if (await question('Targets Mismatch', result.msg || 'What do we do now?', 'Flash anyway', 'Cancel') !== 'cancel') {
            const body = new FormData()
            body.append('action', 'confirm')
            await fetch(`/forceupdate`, { method: 'POST', body })
          }
          break
        case 'error':
          await error('Error', result.msg || 'Unknown error')
          break
      }
    } catch (e) {
      console.log('Upload error:', e)
    }
  }

  progressBar.value!.value = 0
}
</script>

<style lang="postcss" scoped>
.upload {
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin-top: 24px;

  & progress {
    width: 100%;
  }
}
</style>
