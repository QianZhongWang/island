/**
 * 项目所需的验证器
 */
const {HzValidator, Rule} = require('../../core/validator')
const {User} = require('../models/user')
const {LoginType} = require('../lib/enum')

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

/**
 * 校验用户注册
 */
class RegisterValidator extends HzValidator {
    constructor() {
        super();

        this.email = [
            new Rule('isEmail', '不符合email规范')
        ];

        this.password1 = [
            new Rule('isLength', '密码至少6个字符，最多32个字符', {
                min: 6,
                max: 32
            }),
            new Rule('matches', '密码不符合规范', '^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]')
        ];

        this.password2 = this.password1;

        this.nickname = [
            new Rule('isLength', '昵称不符合长度规范', {
                min: 4,
                max: 32
            })
        ]

    }

    validatePassword(vals) {
        const password1 = vals.body.password1;
        const password2 = vals.body.password2;
        if (password1 !== password2) {
            throw new Error('两个密码必需相同')
        }
    }

    async validateEmail(vals) {
        const email = vals.body.email;
        const user = await User.findOne({
            where: {
                email: email
            }
        })
        if (user) {
            throw new Error('Email邮箱已存在')
        }
    }


}

class TokenValidator extends HzValidator {
    constructor() {
        super();
        this.account = [
            new Rule('isLength', '不符合账号规则', {
                min: 4,
                max: 32
            })
        ]
        this.secret = [
            new Rule('isOptional'),
            new Rule('isLength', '至少六个字符', {
                min: 6,
                max: 128
            })
        ]
    }

    validateLoginType(vals) {
        if (!vals.body.type) {
            throw new Error('type is required')
        }
        if (!LoginType.isThisType(vals.body.type)) {
            throw  new Error('type 参数不合法')
        }
    }
}

class NotEmptyValidator extends HzValidator {
    constructor() {
        super();
        this.token = [
            new Rule('isLength', '不允许为空', {min: 1})
        ]

    }
}

module.exports = {
    PositiveIntegerValidator,
    RegisterValidator,
    TokenValidator,
    NotEmptyValidator
}
