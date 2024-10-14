import { toast } from "react-toastify"

export const handleInput = (text) =>{
    if(text.length < 8){
        return "Độ dài tối thiểu của trường này phải bằng hoặc lớn hơn 8 ký tự. Khoảng trắng đầu và cuối sẽ bị bỏ qua."
    }
}

export const search = (text) => {
    const regex = /^[a-zA-z]+$/
    if(!regex.test(text)){
        toast.warn("Ký tự không hợp lệ - Chỉ được nhập chữ cái a-Z")
    }else{
        return true
    }   
}

export const password = (text) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if(regex.test(text)){
        return true
    }else{
        return false
    }
}