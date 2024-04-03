import React from 'react'
import AppLayout from '../../../layout/AppLayout'
import EditForm from '../../../components/editFormBenefits/EditForm'

export const BenefitsPage = () => {

    return (
        <AppLayout Page={"Benefits"}>
            <EditForm></EditForm>
        </AppLayout>
    )
}

export default BenefitsPage;
