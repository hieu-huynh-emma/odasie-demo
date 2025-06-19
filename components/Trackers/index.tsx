"use client"
import {appConfig} from "@/configs";
import dynamic from "next/dynamic";

const GoogleTagManager = dynamic(() => import('@next/third-parties/google').then(mod => mod.GoogleTagManager), {ssr: false});

const DataLayerBootstrap = dynamic(() => import("@/components/DataLayerBootstrap").then(mod => mod.DataLayerBootstrap), {ssr: false});
const SPAPageViewTracker = dynamic(() => import("@/components/SPAPageViewTracker"), {ssr: false});

export default function TrackersProvider({globalSettings, lang}: any) {
    return (
        <>
            {/*Load data layer and tracking scripts after main content */}
            {/*<Suspense fallback={null}>*/}
            <DataLayerBootstrap
                language={lang}
                currency={globalSettings.data?.defaultCurrency.code}
                visitorType={globalSettings.data?.visitor_type || 'visitor'}
                customer={
                    globalSettings.data?.email
                        ? {email: globalSettings.data?.email, phone: ''}
                        : undefined
                }
            />
            {/*</Suspense>*/}


            {/*<Suspense fallback={null}>*/}
            <SPAPageViewTracker
                language={lang}
                currency={globalSettings.data?.defaultCurrency.code}
                visitor_type={globalSettings.data?.visitor_type || 'visitor'}
                email={globalSettings.data?.email || ''}
            />
            {/*</Suspense>*/}

            {/*Load analytics scripts with proper defer/async for better performance*/}

            {appConfig.gtmId && (
                <GoogleTagManager
                    gtmId={appConfig.gtmId}
                    // only include auth/preview/cookies in non-prod
                    gtmScriptUrl={
                        !appConfig.isProd
                            ? `https://www.googletagmanager.com/gtm.js?id=${appConfig.gtmId}` +
                            `&gtm_auth=${appConfig.gtmAuth}` +
                            `&gtm_preview=${appConfig.gtmPreview}` +
                            `&gtm_cookies_win=${appConfig.gtmCookiesWindow}`
                            : undefined
                    }
                    dataLayerName="dataLayer"
                />
            )}
        </>
    )
}
