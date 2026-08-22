<script setup lang="ts">
import {
  ArrowLeft,
  ArrowRight,
  ChevronRight,
  CircleUserRound,
  Edit,
  Plus,
  RefreshCw,
  Search,
  Trash2,
} from 'lucide-vue-next'

const icons = {
  arrowLeft: ArrowLeft,
  arrowRight: ArrowRight,
  chevronRight: ChevronRight,
  profile: CircleUserRound,
  edit: Edit,
  plus: Plus,
  refresh: RefreshCw,
  search: Search,
  delete: Trash2,
}

type IconName = keyof typeof icons

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
  <component
    :is="icons[name]"
    :size="size"
    :stroke-width="strokeWidth"
    aria-hidden="true"
  />
</template>