<script setup lang="ts">
import {
  ChevronLeft,
  ChevronRight,
  User,
  PenLine,
  Plus,
  RotateCw,
  Search,
  Trash2,
  CircleX,
  ExternalLink,
} from 'lucide-vue-next'

import caretRight from '../../assets/icons/right-arrows.png'

/** All the icons used on this weather app */
const icons = {
  arrowLeft: ChevronLeft,
  chevronRight: ChevronRight,
  profile: User,
  edit: PenLine,
  plus: Plus,
  refresh: RotateCw,
  search: Search,
  delete: Trash2,
  x: CircleX,
  link: ExternalLink,
}

type IconName = keyof typeof icons | 'caretRight'

/** Type of parameters that can be input for
 * a particular icon
 */
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