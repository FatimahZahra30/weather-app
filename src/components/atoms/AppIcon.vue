<script setup lang="ts">
import {
  ArrowLeft,
  ChevronRight,
  User,
  Edit,
  Plus,
  RotateCw,
  Search,
  Trash2,
} from 'lucide-vue-next'

import caretRight from '../../assets/icons/right-arrows.png'

const icons = {
  arrowLeft: ArrowLeft,
  chevronRight: ChevronRight,
  profile: User,
  edit: Edit,
  plus: Plus,
  refresh: RotateCw,
  search: Search,
  delete: Trash2,
}

type IconName = keyof typeof icons | 'caretRight'

withDefaults(
  defineProps<{
    name: IconName
    size?: number
    strokeWidth?: number
  }>(),
  {
    size: 24,
    strokeWidth: 2,
  },
)
</script>

<template>
  <!-- Caret PNG -->
  <img
    v-if="name === 'caretRight'"
    :src="caretRight"
    :width="size"
    :height="size"
    alt=""
    aria-hidden="true"
  />

  <!-- Lucide icons -->
  <component
    v-else
    :is="icons[name]"
    :size="size"
    :stroke-width="strokeWidth"
    aria-hidden="true"
  />
</template>