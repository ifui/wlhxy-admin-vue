import { defineComponent, ref } from 'vue'
import { tableColumns, formRules } from './tableConfig'
import { useToast } from 'vue-toastification'
import request from '@/api/course'
import gradeRequest from '@/api/grade'

const toast = useToast()

export default defineComponent({
  name: 'Grade',
  setup: () => {
    // 表格数据
    const data = ref([])
    // 表格加载状态
    const tableLoading = ref(true)
    const initForm = {
      id: 0,
      title: '',
      intro: '',
      price: 0,
      grade_id: undefined,
      create_time: null
    }
    // 模态框数据
    const form = ref(initForm)
    const refFrom = ref(null) as any

    // 模态框标题 ｜ 模态框状态 | 按钮加载状态
    const modalTitle = ref('')
    const modalVisible = ref(false)
    const modalLoading = ref(false)

    // 年级选择器数据
    const gradeSelectValues = ref([])

    // 编辑
    function handleEdit(text: any) {
      modalTitle.value = '编辑'
      form.value = JSON.parse(JSON.stringify(text))
      modalVisible.value = true
    }

    // 删除
    async function handleDelete(event: any) {
      tableLoading.value = true
      await request.delete(0, event.record as any).then(res => {
        if (res.data.status) {
          toast.success(res.data.message)
          data.value.splice(event.index, 1)
        } else {
          toast.error(res.data.message)
        }
      })
      tableLoading.value = false
    }

    // 添加
    function handleAdd() {
      modalTitle.value = '添加'
      form.value = initForm
      modalVisible.value = true
    }

    const slots = {
      action: (event: { text: typeof form.value }) => {
        return (
          <>
            <a-button
              class="mr-2"
              type="primary"
              onClick={() => handleEdit(event.text)}
              ghost
            >
              <i class="iconfont icon-edit mr-2"></i>
              编辑
            </a-button>

            <a-popconfirm
              title="确定删除该课程？"
              okText="确定"
              cancelText="取消"
              onConfirm={() => handleDelete(event)}
            >
              <a-button type="danger" ghost>
                <i class="iconfont icon-del mr-2"></i>
                删除
              </a-button>
            </a-popconfirm>
          </>
        )
      },
      price: (event: { text: string }) => {
        return <span>¥ {event.text}</span>
      }
    }

    // 请求数据
    async function fetchData() {
      tableLoading.value = true
      await request.get().then(res => {
        data.value = res.data.data
        // res.data.status && toast.success(res.data.message)
        !res.data.status && toast.error(res.data.message)
      })
      tableLoading.value = false
    }

    // 更新数据
    async function putData(data: any) {
      await refFrom.value
        .validate()
        .then(async () => {
          modalLoading.value = true
          await request.put(data.id, data).then(res => {
            res.data.status && toast.success(res.data.message) && fetchData()
            !res.data.status && toast.error(res.data.message)
          })
          modalLoading.value = false
        })
        .catch(() => {
          toast.error('请检查表单项')
        })
    }

    // 提交数据
    async function postData(data: any) {
      await refFrom.value
        .validate()
        .then(async () => {
          modalLoading.value = true
          await request.post(data).then(res => {
            res.data.status && toast.success(res.data.message) && fetchData()
            !res.data.status && toast.error(res.data.message)
          })
          modalLoading.value = false
        })
        .catch(() => {
          toast.error('请检查表单项')
        })
    }

    // 模态框提交判断
    function modalSubmit() {
      modalTitle.value === '添加' && postData(form.value)
      modalTitle.value === '编辑' && putData(form.value)
    }

    // 选择器获得焦点
    function handleFocus() {
      if (Object.keys(gradeSelectValues.value).length === 0) {
        gradeRequest.get().then(res => {
          gradeSelectValues.value = res.data.data
        })
      }
    }

    // 向服务器发起请求
    fetchData()
    handleFocus()

    return () => {
      return (
        <>
          <div class="text-right">
            <a-button onClick={handleAdd} class="mb-4" type="primary" ghost>
              <i class="iconfont icon-plus mr-2"></i>
              添加课程
            </a-button>
          </div>
          <a-table
            loading={tableLoading.value}
            columns={tableColumns}
            data-source={data.value}
            rowKey="id"
            v-slots={slots}
            x
          ></a-table>

          <a-modal
            v-model={[modalVisible.value, 'visible']}
            confirm-loading={modalLoading.value}
            title={modalTitle.value}
            onOk={() => modalSubmit()}
            okText="提交"
            cancelText="关闭"
          >
            <a-form
              ref={refFrom}
              layout="vertical"
              model={form.value}
              rules={formRules}
            >
              <a-form-item label="年级" name="grade_id">
                <a-select
                  v-model={[form.value.grade_id, 'value']}
                  placeholder="请选择课程所属年级"
                >
                  {gradeSelectValues.value.map((item: any) => {
                    return (
                      <a-select-option value={item.id}>
                        {item.name}
                      </a-select-option>
                    )
                  })}
                </a-select>
              </a-form-item>
              <a-form-item label="课程名" name="title">
                <a-input v-model={[form.value.title, 'value']}></a-input>
              </a-form-item>
              <a-form-item label="简介" name="intro">
                <a-textarea v-model={[form.value.intro, 'value']}></a-textarea>
              </a-form-item>
              <a-form-item label="创建时间" name="create_time">
                <a-date-picker
                  v-model={[form.value.create_time, 'value']}
                  showTime
                ></a-date-picker>
              </a-form-item>
              <a-form-item label="价格" name="price">
                <a-input-number
                  v-model={[form.value.price, 'value']}
                  formatter={(value: any) => '¥' + value}
                  style="width: 130px"
                ></a-input-number>
              </a-form-item>
            </a-form>
          </a-modal>
        </>
      )
    }
  }
})
