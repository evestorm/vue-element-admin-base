/**
 * 枚举类
 */
export class Enum {
  /**
   * 添加枚举字段
   * field: 枚举字段
   * label: 界面显示
   * value: 枚举值
   * ext: 额外属性
   */
  add(field, label, value, ext = null) {
    if (!ext) {
      ext = {};
      ext.className = field;
    }
    this[field] = { label, value, ext, field };
    return this;
  }

  /**
   * @description 根据枚举value获取其label
   */
  getLabelByValue(value) {
    // 字段不存在返回‘’
    if (value === undefined || value === null) return "";
    for (const [, val] of Object.entries(this)) {
      if (val.value === value) {
        return val.label;
      }
    }

    return "";
  }

  /**
   * @description 根据value找field
   * @param value value值
   */
  getFieldByValue(value) {
    // value不存在返回‘’
    if (value === undefined || value === null) return "";
    for (const [key, val] of Object.entries(this)) {
      if (val.value === value) {
        return key;
      }
    }

    return "";
  }

  /**
   * @description 根据field找value
   * @param field field字段
   */
  getValueByField(field) {
    // field不存在返回‘’
    if (field === undefined || field === null) return "";
    for (const [key, val] of Object.entries(this)) {
      if (key === field) {
        return val.value;
      }
    }

    return "";
  }
}
