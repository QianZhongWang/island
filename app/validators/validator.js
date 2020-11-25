/**
 * 项目所需的验证器
 */
const { HzValidator, Rule } = require('../../core/validator')

/**
 * 校验正整数
 */
class PositiveIntegerValidator extends HzValidator {
	constructor() {
		super();
		this.id = [
			new Rule('isInt', '需要是正整数', { min: 1 })
		]
	}
}

module.exports = {
	PositiveIntegerValidator,
}