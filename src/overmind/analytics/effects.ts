import { EffectResponse } from "@/@types/EffectResponse";
import { CarbonReduction } from "./state";

// import axios from "axios";
export const getCarbonReduction = async (): Promise<EffectResponse<CarbonReduction>> => {
    try {
        return {
            data: {
                activeProjects: 455,
                totalReduction: 7.96,
                annualEstReduction: 38.1,
                sectors: [
                    { title: "Renewable Energy", value: 40 },
                    { title: "Waste Disposal", value: 24 }
                ],
                standards: [
                    { title: "VCS", value: 74 },
                ]
            }
        }
    } catch (error) {
        return { data: undefined, error: { code: "200", message: "could not fetch data" } }
    }
};
