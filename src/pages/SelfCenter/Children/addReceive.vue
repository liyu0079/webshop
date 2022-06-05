<template>
  <div class="mycontainer">
    <el-form ref="form"
      :model="form"
      label-width="80px">
      <el-form-item
        label="收货人">
        <el-input
          v-model="form.receive_name">
        </el-input>
      </el-form-item>
      <el-form-item
        label="收货地址">
        <el-input
          v-model="form.receive_address">
        </el-input>
      </el-form-item>
      <el-form-item
        label="收货电话">
        <el-input
          v-model="form.receive_phone">
        </el-input>
      </el-form-item>
      <el-form-item
        label="默认地址">
        <el-switch
          v-model="form.address_default"
          active-text="是"
          inactive-text="否">
        </el-switch>
      </el-form-item>
    </el-form>
  </div>
</template>
 
<script>
export default {
  name: '',
  components: {},
  data() {
    return {
      form: {
        id:1,
        receive_name: '',
        receive_address: '',
        receive_phone: '',
        address_default: false,
      },
    }
  },
  methods: {
    dataInit(data) {
      if (data) {
        if (data.address_default == 0) {
          data.address_default = false
        } else {
          data.address_default = true
        }
        this.form = data
      }
    },
  },
}
</script>
<style>
.mycontainer {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
</style>