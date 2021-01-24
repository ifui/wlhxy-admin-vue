const tableColumns = [
  {
    title: '#',
    dataIndex: 'id',
    width: 80
  },
  {
    title: '课程名',
    dataIndex: 'title',
    width: 300
  },
  {
    title: '简介',
    dataIndex: 'intro'
  },
  {
    title: '价格',
    dataIndex: 'price',
    slots: { customRender: 'price' },
    width: 100
  },
  {
    title: '年级',
    dataIndex: 'grade_name',
    width: 100
  },
  {
    title: '创建时间',
    dataIndex: 'create_time',
    width: 200
  },
  {
    title: '操作',
    slots: { customRender: 'action' },
    width: 220,
    fixed: 'right'
  }
]

const formRules = {
  title: [{ required: true, message: '请输入课程名', trigger: 'blur' }],
  grade_id: [{ required: true, message: '请选择课程所属年级', trigger: 'blur' }]
}

export { tableColumns, formRules }
