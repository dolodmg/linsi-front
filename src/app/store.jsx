import { create } from "zustand";

export const useFormStoreMember = create(set => {
    return {
        firstName: '',
        lastName: '',
        email: '',
        image: '',
        roleId: '',
        fileImage: null,
        setFirstName: (newFirstName) => set({ firstName: newFirstName }),
        setLastName: (newLastName) => set({ lastName: newLastName }),
        setEmail: (newEmail) => set({ email: newEmail }),
        setRoleId: (newRoleId) => set({ roleId: newRoleId }),
        setFileImage: (newFileImage) => set({ fileImage: newFileImage }),
        setImage: (newImage) => set({ image: newImage }),
        resetForm: () => set(state => ({ 
            firstName: '',
            lastName: '',
            email: '',
            roleId: '',
            image: '',
        }))
    }
})

export const useMemberEditStore = create(set => {
    return {
        member: null,
        setMemberStore: (memb) => set({member: memb})
    }
})
