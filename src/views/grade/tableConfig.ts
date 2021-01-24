const tableColumns = [
  {
    title: '排序',
    dataIndex: 'order',
    width: 100
  },
  {
    title: '#ID',
    dataIndex: 'id',
    width: 100
  },
  {
    title: '名称',
    dataIndex: 'name'
  },
  {
    title: '备注',
    dataIndex: 'remark'
  },
  {
    title: '操作',
    slots: { customRender: 'action' },
    width: 250
  }
]

const tableRules = {
  name: [{ required: true, message: '请输入年级名称', trigger: 'blur' }]
}

export { tableColumns, tableRules }
