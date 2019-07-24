export const reg = {
  ismobile: {
    messages: {
      en: (field, args) => field + '必须是11位手机号码',
      cn: (field, args) => field + '必须是11位手机号码'
    },
    validate: (value, args) => {
      return value.length === 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/.test(value)
    }
  },
  max70: {
    messages: {
      en: (field, args) => field + '字符最长不能超过70个',
      cn: (field, args) => field + '字符最长不能超过70个'
    },
    validate: (value, args) => {
      return /^.{1,70}$/.test(value)
    }
  }
}
