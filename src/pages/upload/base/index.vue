<template>
  <t-card :bordered="false">
    <t-form
      ref="form"
      :data="formData"
      :rules="FORM_RULES"
      label-align="top"
      :label-width="100"
      @reset="onReset"
      @submit="onSubmit"
    >
      <div class="form-basic-container">
        <div class="form-basic-item">
          <div class="form-basic-container-title">任务创建</div>
          <!-- 表单内容 -->

          <!-- 合同名称,合同类型 -->
          <t-row class="row-gap" :gutter="[16, 24]">
            <t-col :span="6">
              <t-form-item label="用户名" name="name">
                <t-input v-model="formData.user" :style="{ width: '322px' }" placeholder="请输入内容" />
              </t-form-item>
            </t-col>
            <t-col :span="6">
              <t-form-item label="模型类型" name="type">
                <t-select
                  v-model="formData.model"
                  :style="{ width: '322px' }"
                  placeholder="请选择类型"
                  class="demo-select-base"
                  clearable
                >
                  <t-option v-for="(item, index) in typeOptions" :key="index" :value="item.value" :label="item.label">
                    {{ item.label }}
                  </t-option>
                </t-select>
              </t-form-item>
            </t-col>

            <t-col :span="6">
              <t-form-item label="申请配额" name="partyB">
                <t-input-number
                  v-model="formData.quota"
                  :step="0.18"
                  :max="100"
                  :min="0"
                  :allow-input-over-limit="false"
                  style="width: 200px"
                />
              </t-form-item>
            </t-col>
            

            <t-col :span="6">
              <t-form-item label="上传文件" name="files">
                <t-upload
                  v-model="formData.file"
                  action="https://service-bv448zsw-1257786608.gz.apigw.tencentcs.com/api/upload-demo"
                  tips="请上传文件，大小在60M以内"
                  :size-limit="{ size: 300, unit: 'MB' }"
                  :format-response="formatResponse"
                  :before-upload="beforeUpload"
                  @fail="handleFail"
                >
                  <t-button class="form-submit-upload-btn" variant="outline"> 上传测试文件 </t-button>
                </t-upload>
              </t-form-item>
            </t-col>
          </t-row>
        </div>
      </div>

      <div class="form-submit-container">
        <div class="form-submit-sub">
          <div class="form-submit-left">
            <t-button theme="primary" class="form-submit-confirm" type="submit"> 提交 </t-button>
            <t-button type="reset" class="form-submit-cancel" theme="default" variant="base"> 取消 </t-button>
          </div>
        </div>
      </div>
    </t-form>
  </t-card>
</template>
<script>
import { prefix } from '@/config/global';

const INITIAL_DATA = {
  user: '',
  model: '',
  quota: '',
  file: [],
};
const FORM_RULES = {
  name: [{ required: true, message: '请输入合同名称', type: 'error' }],
  type: [{ required: true, message: '请选择合同类型', type: 'error' }],
  payment: [{ required: true, message: '请选择合同收付类型', type: 'error' }],
  amount: [{ required: true, message: '请输入合同金额', type: 'error' }],
  partyA: [{ required: true, message: '请选择甲方', type: 'error' }],
  partyB: [{ required: true, message: '请选择乙方', type: 'error' }],
  signDate: [{ required: true, message: '请选择日期', type: 'error' }],
  startDate: [{ required: true, message: '请选择日期', type: 'error' }],
  endDate: [{ required: true, message: '请选择日期', type: 'error' }],
};

export default {
  name: 'FormBase',
  data() {
    return {
      prefix,
      stepSuccess: true,
      formData: { ...INITIAL_DATA },
      FORM_RULES,
      typeOptions: [
        { label: 'GPT-4', value: 'gpt-4' },
        { label: 'GPT-4 code interpreter', value: 'gpt-4-code' },
        { label: 'GPT-3.5', value: 'gpt-3' },
      ],
      partyAOptions: [
        { label: '公司A', value: '1' },
        { label: '公司B', value: '2' },
        { label: '公司C', value: '3' },
      ],
      partyBOptions: [
        { label: '公司A', value: '1' },
        { label: '公司B', value: '2' },
        { label: '公司C', value: '3' },
      ],
      textareaValue: '',
      rules: {
        name: [{ required: true, message: '请输入合同名称', type: 'error' }],
        type: [{ required: true, message: '请选择合同类型', type: 'error' }],
        payment: [{ required: true, message: '请选择合同收付类型', type: 'error' }],
        amount: [{ required: true, message: '请输入合同金额', type: 'error' }],
        partyA: [{ required: true, message: '请选择甲方', type: 'error' }],
        partyB: [{ required: true, message: '请选择乙方', type: 'error' }],
        signDate: [{ required: true, message: '请选择日期', type: 'error' }],
        startDate: [{ required: true, message: '请选择日期', type: 'error' }],
        endDate: [{ required: true, message: '请选择日期', type: 'error' }],
      },
    };
  },
  methods: {
    handleFail({ file }) {
      this.$message.error(`文件 ${file.name} 上传失败`);
    },
    beforeUpload(file) {
      if (!/\.(pdf)$/.test(file.name)) {
        this.$message.warning('请上传pdf文件');
        return false;
      }
      return true;
    },
    // 用于格式化接口响应值，error 会被用于上传失败的提示文字；url 表示文件/图片地址
    formatResponse(res) {
      return { ...res, error: '上传失败，请重试', url: res.url };
    },
    changeStatus() {
      this.stepSuccess = !this.stepSuccess;
    },
    onReset() {
      this.$message.warning('取消新建');
    },
    onSubmit({ validateResult }) {
      if (validateResult === true) {
        this.$message.success('新建成功');
      }
    },
  },
};
</script>
<style lang="less" scoped>
@import './index';
</style>
