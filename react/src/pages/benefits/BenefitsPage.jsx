import React from 'react'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AppLayout from '../../layout/AppLayout'
import SectionTable from '../../components/sectionTable/SectionTable'
import { usePage } from '../../contexts/PageContext';
import { useTranslation } from "react-i18next";

//Pantalla que mostrara la pagina de beneficios y chart
export const BenefitsPage = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { setPage, setSteps } = usePage();
    useEffect(() => {
        setPage(t("Profit"));
        setSteps([{ name: t("Profit"), href: '/profit', current: true }]);
    }, [setPage, setSteps, navigate]);
    return (
        <>
            <SectionTable SectionName={"Benefits"}></SectionTable>
        </>
    )
}

export default BenefitsPage;
