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
			new Rule('isInt', '需要是正整数', {min: 1})
		]
	}
}

class RegisterValidator extends HzValidator {
	constructor() {
		super();
		this.email = [
			new Rule('isEmail', '不符合email规范')
		]
		this.password1 = [
			new Rule('isLength', '密码至少6个字符，最多32个字符', {
				min: 6,
				max: 32
			}),
			new Rule('matches', '', '^')
		]
	}
}

module.exports = {
	PositiveIntegerValidator,
}