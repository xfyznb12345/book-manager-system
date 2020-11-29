<template>
  <el-form :model="form" :inline="inline" ref="form" label-width="80px">
    <el-form-item
      v-for="item in formLabel"
      :key="item.model"
      :label="item.label"
      :prop="form[item.model]"
    >
      <!-- 输入框 -->
      <el-input
        v-model="form[item.model]"
        :placeholder="`请输入${item.point}`"
        :type="item.textarea"
        :style="item.style"
        v-if="!item.type"
        :clearable="item.del"
        maxlength="30"
      ></el-input>
      <!-- 选择框 -->
      <el-select
        :clearable="item.del"
        v-model="form[item.model]"
        :placeholder="`请选择${item.point}`"
        :style="item.style"
        v-if="item.type === 'select'"
      >
        <el-option
          v-for="item in item.opts"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item>
      <slot></slot>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  props: {
    inline: Boolean,
    form: Object,
    formLabel: Array,
  },
}
</script>

<style lang="scss"></style>
