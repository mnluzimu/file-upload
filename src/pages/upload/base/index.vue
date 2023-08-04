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
              <t-form-item label="用户名" name="user">
                <t-input v-model="formData.user" :style="{ width: '322px' }" placeholder="请输入内容" />
              </t-form-item>
            </t-col>
            <t-col :span="6">
              <t-form-item label="模型类型" name="model">
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
              <t-form-item label="申请配额" name="quota">
                <t-input-number
                  v-model="formData.quota"
                  :max="100"
                  :min="0"
                  :allow-input-over-limit="false"
                  style="width: 200px"
                />
              </t-form-item>
            </t-col>
            

            <t-col :span="6">
              <t-form-item label="上传文件" name="file">
                <!-- <t-upload
                  v-model="formData.file"
                  action="http://10.158.217.11:8080/task"
                  tips="请上传文件，大小在300M以内"
                  :size-limit="{ size: 300, unit: 'MB' }"
                  :format-response="formatResponse"
                  :before-upload="beforeUpload"
                  @fail="handleFail"
                >
                  <t-button class="form-submit-upload-btn" variant="outline"> 上传测试文件 </t-button>
                </t-upload> -->
                <input type="file" ref="fileInput" />
              </t-form-item>
            </t-col>
          </t-row>
        </div>
      </div>
      <!-- <p>{{ formData.user }}</p>
      <p>{{ formData.model }}</p>
      <p>{{ formData.quota }}</p>
      <p>{{ formData.file[0] }}</p> -->

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
  user: [{ required: true, message: '请输入用户名', type: 'error' }],
  model: [{ required: true, message: '请选择模型', type: 'error' }],
  quota: [{ required: true, message: '请填写配额', type: 'error' }],
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
    };
  },
  methods: {
    handleFail({ file }) {
      this.$message.error(`文件 ${file.name} 上传失败`);
    },
    beforeUpload(file) {
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
        const formData = new FormData();

        console.log(this.$refs.fileInput.files[0])
        formData.append('file', this.$refs.fileInput.files[0]);
        formData.append('user', "wangke");
        formData.append('model', "gpt-4");

        this.$request.post("http://10.158.217.11:8080/task", formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        .then(response => {
          console.log('File uploaded successfully', response.data);
          // Do something with the response
        })
        .catch(error => {
          console.error('Error uploading file', error);
          // Handle the error
        });
      }
    },
  },
};
</script>
<style lang="less" scoped>
@import './index';
</style>
