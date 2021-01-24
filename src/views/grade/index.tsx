import { defineComponent, reactive, ref } from 'vue'
import { tableColumns, tableRules } from './tableConfig'
import { useToast } from 'vue-toastification'
import request from '@/api/grade'

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
      name: '',
      remark: '',
      order: 0
    }
    // 模态框数据
    const form = ref(initForm)
    const refFrom = ref(null) as any

    // 模态框标题 ｜ 模态框状态 | 按钮加载状态
    const modalTitle = ref('')
    const modalVisible = ref(false)
    const modalLoading = ref(false)

    // 编辑
    function handleEdit(record: typeof form.value) {
      modalTitle.value = '编辑'
      form.value = record
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
      console.log(modalTitle.value)
    }

    const slots = {
      action: (event: { record: any }) => {
        return (
          <>
            <a-button
              class="mr-2"
              type="primary"
              onClick={() => handleEdit(event.record)}
              ghost
            >
              <i class="iconfont icon-edit mr-2"></i>
              编辑
            </a-button>

            <a-popconfirm
              title="确定删除该年级？"
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

    // 向服务器发起请求
    fetchData()

    return () => {
      return (
        <>
          <div class="text-right">
            <a-button onClick={handleAdd} class="mb-4" type="primary" ghost>
              <i class="iconfont icon-plus mr-2"></i>
              添加年级
            </a-button>
          </div>
          <a-table
            loading={tableLoading.value}
            columns={tableColumns}
            data-source={data.value}
            rowKey="id"
            v-slots={slots}
            pagination={false}
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
              model={form}
              rules={tableRules}
            >
              <a-form-item label="名称" name="value.name">
                <a-input v-model={[form.value.name, 'value']}></a-input>
              </a-form-item>
              <a-form-item label="备注" name="value.remark">
                <a-input v-model={[form.value.remark, 'value']}></a-input>
              </a-form-item>
              <a-form-item label="排序" name="value.order">
                <a-input-number
                  v-model={[form.value.order, 'value']}
                  type="number"
                ></a-input-number>
              </a-form-item>
            </a-form>
          </a-modal>
        </>
      )
    }
  }
})
