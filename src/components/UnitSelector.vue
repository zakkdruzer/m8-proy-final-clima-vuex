<script setup>
defineProps({
  modelValue: {
    type: String,
    default: 'celsius'
  }
})

defineEmits(['update:modelValue'])
</script>

<template>
  <fieldset class="unit-selector">
    <legend class="unit-selector__legend">
      Unidad de temperatura
    </legend>

    <label class="unit-selector__option">
      <input
        type="radio"
        name="temperature-unit"
        value="celsius"
        :checked="modelValue === 'celsius'"
        @change="$emit('update:modelValue', 'celsius')"
      >
      °C
    </label>

    <label class="unit-selector__option">
      <input
        type="radio"
        name="temperature-unit"
        value="fahrenheit"
        :checked="modelValue === 'fahrenheit'"
        @change="$emit('update:modelValue', 'fahrenheit')"
      >
      °F
    </label>
  </fieldset>
</template>