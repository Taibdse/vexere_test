class StringUtils {
    static contain(str1, str2) {
        if (str1 === null || str1 === undefined) return false;
        str1 = StringUtils.removeVnAccents(str1);
        str2 = StringUtils.removeVnAccents(str2);
        return str1.toLowerCase().indexOf(str2.toLowerCase()) > -1;
    }

    static removeVnAccents(str) {
        if(str === null || str === undefined) return '';
        // remove accents
        const from = "àáãảạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệđùúủũụưừứửữựòóỏõọôồốổỗộơờớởỡợìíỉĩịäëïîöüûñçýỳỹỵỷ";
        const to = "aaaaaaaaaaaaaaaaaeeeeeeeeeeeduuuuuuuuuuuoooooooooooooooooiiiiiaeiiouuncyyyyy";
        
        for (var i = 0, l = from.length; i < l; i++) {
            str = str.replace(RegExp(from[i], "gi"), to[i]);
        }
        return str;
    }
}

export default StringUtils;