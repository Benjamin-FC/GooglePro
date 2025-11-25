import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "./Input";
import { Select } from "./Select";
import { Building2, MapPin, Calendar, Users, DollarSign, CheckCircle2, Loader2, AlertCircle, ExternalLink } from "lucide-react";

export function CompanyProfile({ value = {}, onChange }) {
    const [isSearching, setIsSearching] = useState(false);
    const [lookupResult, setLookupResult] = useState(null);
    const prevCompanyNameRef = useRef(value.companyName);

    const handleChange = (field, val) => {
        // If company name changes, clear the lookup result and reset
        if (field === "companyName" && val !== prevCompanyNameRef.current) {
            setLookupResult(null);
            prevCompanyNameRef.current = val;
        }
        onChange({ ...value, [field]: val });
    };

    // Automatic lookup when Name and State are present
    useEffect(() => {
        const performLookup = async () => {
            if (value.companyName?.length > 2 && value.state) {
                setIsSearching(true);
                setLookupResult(null);

                // Simulate API delay
                await new Promise((resolve) => setTimeout(resolve, 1500));

                // Mock data based on state
                const agencies = {
                    FL: "Florida Division of Corporations (Sunbiz)",
                    CA: "California Secretary of State",
                    NY: "NY Department of State - Division of Corporations",
                    TX: "Texas Secretary of State",
                    other: "State Business Registry"
                };

                const agency = agencies[value.state] || agencies.other;

                // State-specific URLs
                const stateUrls = {
                    FL: 'https://search.sunbiz.org/Inquiry/CorporationSearch/ByName',
                    NY: 'https://apps.dos.ny.gov/publicInquiry/',
                    CA: 'https://bizfileonline.sos.ca.gov/search/business',
                    TX: 'https://mycpa.cpa.state.tx.us/coa/',
                    other: '#'
                };

                // Generate more realistic mock data based on company name
                const companyLower = value.companyName.toLowerCase();
                let mockData = {
                    agency: agency,
                    status: "Active",
                    filingDate: "2018-03-15",
                    address: `123 Business Blvd, ${value.state === 'FL' ? 'Miami, FL 33101' : value.state === 'NY' ? 'New York, NY 10001' : 'City, ' + value.state}`,
                    officers: ["Jane Doe (CEO)", "John Smith (CFO)"],
                    docNumber: "L18000012345",
                    entityType: "Limited Liability Company",
                    lastReport: "2024-04-01",
                    sourceUrl: stateUrls[value.state] || stateUrls.other
                };

                // Special cases for well-known companies (for demo purposes)
                if (companyLower.includes('ibm')) {
                    mockData = {
                        agency: agency,
                        status: "Active",
                        filingDate: "1911-06-16",
                        address: "1 New Orchard Road, Armonk, NY 10504",
                        officers: ["Arvind Krishna (CEO)", "James Kavanaugh (CFO)"],
                        docNumber: "NY-29169",
                        entityType: "Stock Corporation",
                        lastReport: "2024-03-01",
                        sourceUrl: 'https://apps.dos.ny.gov/publicInquiry/'
                    };
                    // Auto-fill years in business for IBM
                    if (!value.yearsInBusiness) {
                        const years = new Date().getFullYear() - 1911;
                        handleChange("yearsInBusiness", years.toString());
                    }
                } else {
                    // Auto-fill fields if they are empty (default case)
                    if (!value.yearsInBusiness) {
                        const years = new Date().getFullYear() - 2018;
                        handleChange("yearsInBusiness", years.toString());
                    }
                }

                setLookupResult(mockData);
                setIsSearching(false);
            }
        };

        const timeoutId = setTimeout(performLookup, 800); // Debounce
        return () => clearTimeout(timeoutId);
    }, [value.companyName, value.state]);

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Company Name</label>
                    <Input
                        value={value.companyName || ""}
                        onChange={(e) => handleChange("companyName", e.target.value)}
                        placeholder="Acme Corp"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">State of Operation</label>
                    <Select
                        value={value.state || ""}
                        onChange={(e) => handleChange("state", e.target.value)}
                        options={[
                            { label: "Florida", value: "FL" },
                            { label: "California", value: "CA" },
                            { label: "New York", value: "NY" },
                            { label: "Texas", value: "TX" },
                            { label: "Other", value: "other" },
                        ]}
                        placeholder="Select State"
                    />
                </div>
            </div>

            {/* Lookup Status/Result Area */}
            <div className="min-h-[60px]">
                <AnimatePresence mode="wait">
                    {isSearching ? (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex items-center gap-3 text-blue-600 bg-blue-50 p-4 rounded-xl border border-blue-100"
                        >
                            <Loader2 className="w-5 h-5 animate-spin" />
                            <span className="font-medium">Searching {value.state ? (value.state === 'FL' ? 'Sunbiz' : 'State Registry') : 'records'}...</span>
                        </motion.div>
                    ) : lookupResult ? (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-slate-50 rounded-xl border border-slate-200 overflow-hidden"
                        >
                            <div className="bg-slate-100 px-4 py-2 border-b border-slate-200 flex justify-between items-center">
                                <a
                                    href={lookupResult.sourceUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-xs font-semibold text-blue-600 hover:text-blue-700 uppercase tracking-wider hover:underline flex items-center gap-1"
                                >
                                    Source: {lookupResult.agency}
                                    <ExternalLink className="w-3 h-3" />
                                </a>
                                <span className="flex items-center gap-1 text-xs font-medium text-orange-700 bg-orange-100 px-2 py-0.5 rounded-full">
                                    <AlertCircle className="w-3 h-3" />
                                    Demo Data
                                </span>
                            </div>
                            <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
                                <div>
                                    <div className="text-sm text-slate-500">Entity Name</div>
                                    <div className="font-semibold text-slate-900">{value.companyName}</div>
                                </div>
                                <div>
                                    <div className="text-sm text-slate-500">Status</div>
                                    <div className="font-medium text-green-600">{lookupResult.status}</div>
                                </div>
                                <div>
                                    <div className="text-sm text-slate-500">Document Number</div>
                                    <div className="font-medium text-slate-900">{lookupResult.docNumber}</div>
                                </div>
                                <div>
                                    <div className="text-sm text-slate-500">Filing Date</div>
                                    <div className="font-medium text-slate-900">{lookupResult.filingDate}</div>
                                </div>
                                <div className="md:col-span-2">
                                    <div className="text-sm text-slate-500">Principal Address</div>
                                    <div className="font-medium text-slate-900 flex items-center gap-2">
                                        <MapPin className="w-4 h-4 text-slate-400" />
                                        {lookupResult.address}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ) : null}
                </AnimatePresence>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Employees</label>
                    <div className="relative">
                        <Users className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                        <Input
                            type="number"
                            className="pl-10"
                            value={value.employees || ""}
                            onChange={(e) => handleChange("employees", e.target.value)}
                            placeholder="0"
                        />
                    </div>
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Years in Business</label>
                    <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                        <Input
                            type="number"
                            className="pl-10"
                            value={value.yearsInBusiness || ""}
                            onChange={(e) => handleChange("yearsInBusiness", e.target.value)}
                            placeholder="0"
                        />
                    </div>
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Annual Revenue (Est.)</label>
                    <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                        <Select
                            className="pl-10"
                            value={value.size || ""}
                            onChange={(e) => handleChange("size", e.target.value)}
                            options={[
                                { label: "< $1M", value: "micro" },
                                { label: "$1M - $5M", value: "small" },
                                { label: "$5M - $20M", value: "medium" },
                                { label: "$20M+", value: "large" },
                            ]}
                            placeholder="Select Range"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
