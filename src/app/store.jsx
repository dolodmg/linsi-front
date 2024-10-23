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

export const useFormStoreProject = create(set => {
    return {
        name: '',
        description: '',
        startDate: '',
        endDate: '',
        setName: (newName) => set({ name: newName }),
        setDescription: (newDescription) => set({ description: newDescription }),
        setStartDate: (newStartDate) => set({ startDate: newStartDate }),
        setEndDate: (newEndDate) => set({ endDate: newEndDate }),
        resetForm: () => set(state => ({ 
            name: '',
            description: '',
            startDate: '',
            endDate: '',
        }))
    }
})

export const useProjectEditStore = create(set => {
    return {
        project: null,
        setProjectStore: (proj) => set({project: proj})
    }
})
