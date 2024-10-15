import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import mainTop from "@/assets/images/mainTop.png";
import rectangle from "@/assets/images/Rectangle.png";
import aboutUs from "@/assets/images/about_us.svg";
import artikel1 from "@/assets/images/artikel1.png";
import artikel2 from "@/assets/images/artikel2.png";
import artikel3 from "@/assets/images/artikel3.png";
import artikel4 from "@/assets/images/artikel4.png";
import logoFooter from "@/assets/images/logoFooter.svg";
import call from "@/assets/images/Call.svg";
import location from "@/assets/images/Location.svg";
import message from "@/assets/images/Message.svg";
import Navbar from "@/components/Navbar";
import { Link } from "react-router-dom";

const Dashboard = () => {
    return (
        <div className="w-full top-0 left-0">
            {/* navbar */}
            <Navbar />
            {/* mainTop */}
            <div className="mainTop p-10 pt-36 flex gap-16">
                <div className="textMain">
                    <div className="text-5xl font-semibold">
                        Healthy Minds, Happy Lives
                        <h1 className="text-green-900">Mental Health</h1>Consultancy
                    </div>
                    <p className="w-96 pt-12">
                        Together we build a healthy mind and a happier life. Counseling and
                        therapy tailored to individual needs. Feel the difference with
                        better mental health.
                    </p>
                    <Link to="/check">
                        <Button className="bg-green-700 mt-12 hover:bg-green-900 text-white font-semibold px-10 py-5 rounded-full">
                            Get Started
                        </Button>
                    </Link>
                </div>
                <div className="imageMain">
                    <img src={mainTop} />
                </div>
            </div>
            {/* rectangle */}
            <div className="rectangle">
                <img src={rectangle} className="w-full" />
            </div>
            {/* bestChoice */}
            <div className="bestChoice p-10 text-center">
                <h1 className="text-4xl font-semibold pr-60 pl-60">
                    Why Our Mental Health Consultants are the Best Choice
                </h1>
                <div className="list pt-20">
                    <ul className="flex justify-center space-x-10">
                        <li>
                            <div className="holistic rounded-3xl p-10 flex flex-col justify-center items-center w-72 h-80 border-4 border-black hover:text-white ease-in duration-100 hover:bg-gradient-to-l from-green-700 to-green-300 hover:border-white hover:scale-125">
                                <svg
                                    width="114"
                                    height="132"
                                    viewBox="0 0 114 132"
                                    fill="currentColor"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M33.5608 77.1089C29.1515 71.6889 21.5696 73.7717 19.4746 80.4546C18.635 79.3935 16.4803 76.6635 16.4198 76.5936C15.9411 76.0432 15.6772 75.311 15.6772 74.5323V43.6871C15.6772 38.7177 12.1608 34.6747 7.83861 34.6747C3.51641 34.6747 0 38.7177 0 43.6871V87.3845C0 90.1365 0.932262 92.7236 2.62445 94.6697C2.68969 94.7447 1.75609 93.7576 16.6689 109.46C17.5006 110.435 17.9581 111.722 17.9581 113.089V128.512C17.9581 129.926 18.9552 131.072 20.1847 131.072H46.9395C48.169 131.072 49.1661 129.926 49.1661 128.512V97.3009C49.1661 96.6514 48.9514 96.0263 48.5656 95.5522L33.5608 77.1089ZM44.7129 125.952H22.4112V113.089C22.4112 110.337 21.4794 107.75 19.7868 105.804C19.7124 105.719 20.2354 106.274 5.7423 91.0136C4.91068 90.0387 4.45312 88.7523 4.45312 87.3848V43.6871C4.45312 41.5408 5.97186 39.7946 7.83861 39.7946C9.70536 39.7946 11.2239 41.5408 11.2239 43.6871V74.5323C11.2239 76.6381 11.925 78.6191 13.1979 80.1264C15.252 82.725 25.6202 95.843 27.686 98.4567C28.5145 99.5046 29.9226 99.579 30.8312 98.6295C31.7412 97.6788 31.8087 96.0598 30.9815 95.0133L24.2119 86.4481C22.9441 84.4904 23.2337 81.6888 24.944 80.1389C26.5794 78.6564 28.8856 78.8572 30.3086 80.6061L44.7129 98.3113V125.952Z" />
                                    <path d="M106.161 34.6747C101.839 34.6747 98.323 38.7177 98.323 43.6871V74.5323C98.323 75.311 98.0594 76.0429 97.5805 76.5936C97.523 76.6596 95.0959 79.7337 94.5256 80.4546C92.4309 73.7722 84.849 71.6892 80.4395 77.1089L65.4345 95.5522C65.0486 96.0263 64.834 96.6514 64.834 97.3009V128.512C64.834 129.926 65.831 131.072 67.0605 131.072H93.8154C95.0449 131.072 96.0419 129.926 96.0419 128.512V113.089C96.0419 111.722 96.4995 110.435 97.3311 109.46C112.079 93.9312 111.31 94.7455 111.376 94.67C113.068 92.7239 114 90.1367 114 87.3848V43.6871C114 38.7177 110.484 34.6747 106.161 34.6747ZM109.547 87.3848C109.547 88.7523 109.089 90.0387 108.258 91.0136C93.7011 106.341 94.2843 105.723 94.2133 105.804C92.5206 107.75 91.5888 110.337 91.5888 113.089V125.952H69.2871V98.3116L83.6914 80.6064C85.1142 78.8582 87.42 78.657 89.0561 80.1392C90.7641 81.6867 91.058 84.4876 89.7882 86.4483L83.0183 95.0135C82.1912 96.0601 82.2586 97.679 83.1686 98.6298C84.0784 99.5803 85.4867 99.5038 86.3139 98.457C88.4091 95.8061 98.7606 82.7092 100.802 80.1266C102.075 78.6193 102.776 76.6381 102.776 74.5325V43.6871C102.776 41.5408 104.295 39.7946 106.161 39.7946C108.028 39.7946 109.547 41.5411 109.547 43.6871V87.3848Z" />
                                    <path d="M75.5557 23.5525H70.4137C69.1842 23.5525 68.1872 24.6989 68.1872 26.1125V28.683C68.1872 34.8992 64.3319 40.0985 59.2264 41.2889V28.6725H61.6201C62.8496 28.6725 63.8467 27.5261 63.8467 26.1125C63.8467 24.6989 62.8496 23.5525 61.6201 23.5525H52.603C51.3735 23.5525 50.3764 24.6989 50.3764 26.1125C50.3764 27.5261 51.3735 28.6725 52.603 28.6725H54.7732V41.2889C49.6677 40.0988 45.8124 34.8992 45.8124 28.683V26.1125C45.8124 24.6989 44.8154 23.5525 43.5859 23.5525H38.4438C37.2143 23.5525 36.2173 24.6989 36.2173 26.1125C36.2173 27.5261 37.2143 28.6725 38.4438 28.6725H41.3593V28.683C41.3593 37.7292 47.2003 45.2334 54.7732 46.4801V51.8274H52.603C51.3735 51.8274 50.3764 52.9735 50.3764 54.3874C50.3764 55.801 51.3735 56.9474 52.603 56.9474H61.6201C62.8496 56.9474 63.8467 55.801 63.8467 54.3874C63.8467 52.9735 62.8496 51.8274 61.6201 51.8274H59.2264V46.4801C66.7993 45.2334 72.6403 37.729 72.6403 28.683L75.5557 28.6725C76.7853 28.6725 77.7823 27.5261 77.7823 26.1125C77.7823 24.6986 76.7853 23.5525 75.5557 23.5525Z" />
                                    <path d="M88.862 36.6333C88.862 16.4334 74.5688 0 57.0001 0C39.4314 0 25.1382 16.4334 25.1382 36.6333C25.1382 56.833 39.4312 73.2666 57.0001 73.2666C74.569 73.2666 88.862 56.833 88.862 36.6333ZM57.0001 68.1464C41.8868 68.1464 29.5913 54.0096 29.5913 36.6331C29.5913 19.2568 41.8868 5.12 57.0001 5.12C72.1133 5.12 84.4088 19.2568 84.4088 36.6333C84.4088 54.0098 72.1133 68.1464 57.0001 68.1464Z" />
                                </svg>
                                <h1 className="font-semibold pt-3">Holistic Approach</h1>
                                <h1 className="pt-5">
                                    Aligning mind, body, and spirit for overall well-being
                                </h1>
                            </div>
                        </li>
                        <li>
                            <div className="expertise rounded-3xl p-10 flex flex-col justify-center items-center w-72 h-80 border-4 border-black hover:text-white ease-in duration-100 hover:bg-gradient-to-l from-green-700 to-green-300 hover:border-white hover:scale-125">
                                <svg
                                    width="144"
                                    height="132"
                                    viewBox="0 0 149 168"
                                    fill="currentColor"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M132.812 108.563H126.09C124.483 108.563 123.108 110.133 123.108 111.932V115.201C123.108 123.108 118.16 129.721 111.466 131.235V115.075H114.596C116.203 115.075 117.507 113.617 117.507 111.819C117.507 110.021 116.203 108.563 114.596 108.563H102.81C101.203 108.563 99.8996 110.021 99.8996 111.819C99.8996 113.617 101.203 115.075 102.81 115.075H105.646V131.235C98.9517 129.721 94.0041 123.107 94.0041 115.201V111.931C94.0041 110.133 92.6307 108.562 91.0236 108.562H84.3024C82.6953 108.562 81.3921 110.02 81.3921 111.818C81.3921 113.616 82.6953 115.075 84.3024 115.075H88.1834V115.201C88.1834 126.707 95.7503 136.252 105.646 137.838V144.706H102.81C101.203 144.706 99.8996 146.164 99.8996 147.962C99.8996 149.76 101.203 151.218 102.81 151.218H114.596C116.203 151.218 117.507 149.76 117.507 147.962C117.507 146.164 116.203 144.706 114.596 144.706H111.466V137.838C121.361 136.252 129 126.707 129 115.201L132.811 115.188C134.418 115.188 135.722 113.673 135.722 111.875C135.722 110.077 134.419 108.563 132.812 108.563Z" />
                                    <path d="M57.1654 67.1267C55.4509 69.0442 52.6625 69.0442 50.9494 67.1267C49.8127 65.8555 47.9704 65.8555 46.8333 67.1267C45.6968 68.3982 45.6968 70.46 46.8333 71.7318C50.8159 76.1878 57.2972 76.1888 61.2809 71.7318C62.4177 70.4603 62.4177 68.3988 61.2812 67.127C60.145 65.8558 58.3019 65.8555 57.1654 67.1267Z" />
                                    <path d="M43.8288 56.3371C45.4362 56.3371 46.7392 54.8793 46.7392 53.081C46.7392 51.2827 45.4362 49.8248 43.8288 49.8248C42.2215 49.8248 40.9185 51.2827 40.9185 53.081C40.9185 54.8793 42.2215 56.3371 43.8288 56.3371Z" />
                                    <path d="M64.2858 56.3371C65.8932 56.3371 67.1962 54.8793 67.1962 53.081C67.1962 51.2827 65.8932 49.8248 64.2858 49.8248C62.6785 49.8248 61.3755 51.2827 61.3755 53.081C61.3755 54.8793 62.6785 56.3371 64.2858 56.3371Z" />
                                    <path d="M108.52 76.9622C103.2 76.9622 98.079 78.1194 93.4224 80.217V44.9084C93.4224 20.363 75.719 0.784485 54.0031 0.784485C32.2569 0.784485 14.5518 20.5782 14.5518 44.9084V108.948C5.52968 116.078 0 127.631 0 140.212V164.243C0 166.041 1.31141 167.499 2.9185 167.499H108.557C130.868 167.499 149 147.192 149 122.231C149 97.2697 130.831 76.9622 108.52 76.9622ZM54.0194 7.29676C72.49 7.29676 87.6014 23.9926 87.6014 44.9084V83.4705C81.1986 87.9207 75.7458 94.5613 72.3078 102.05H65.7737V89.4153C75.0869 84.4734 81.7807 73.7103 81.7807 61.2555V40.0043C81.7807 38.2063 80.4905 36.7482 78.8834 36.7482C72.1474 36.7482 65.6582 34.0078 60.5997 29.0321L55.9757 24.481C54.8721 23.3958 53.2202 23.4006 52.1224 24.4931L47.6725 28.8462C42.596 33.8948 36.0608 36.602 29.2689 36.602H29.2185C27.6114 36.602 26.1932 38.2063 26.1932 40.0043V61.2555C26.1932 73.7103 32.887 84.4734 42.4912 89.4153V102.05H34.0401C29.3274 102.05 24.7377 103.225 20.3722 105.306V44.9084C20.3725 24.1691 35.4828 7.29676 54.0194 7.29676ZM53.9868 85.7896C41.8954 85.7896 32.0139 74.7835 32.0139 61.2552V43.124C39.2898 42.4386 46.0558 39.1831 51.4827 33.7861L54.0395 31.272L56.7356 33.9225C62.1247 39.2235 68.9751 42.4279 75.96 43.1188V61.2549C75.9603 74.7838 66.0785 85.7896 53.9868 85.7896ZM48.3119 91.604C50.0581 92.0599 52.1239 92.3022 54.1323 92.3022C56.141 92.3022 57.9161 92.0599 59.9533 91.604V104.215C57.043 107.981 51.2223 107.986 48.3119 104.215V91.604ZM23.2828 160.986V147.895C23.2828 146.097 21.9796 144.639 20.3725 144.639C18.7654 144.639 17.4621 146.097 17.4621 147.895V160.986H5.82071V140.212C5.82071 122.32 18.8771 108.563 34.0404 108.563H43.8299C43.8657 108.563 43.9004 108.601 43.9359 108.6C49.405 115.169 58.6815 115.192 64.1797 108.589C64.2152 108.591 64.2499 108.563 64.2857 108.563H69.9577C68.7493 112.796 68.0962 117.458 68.0962 122.188C68.0962 138.604 75.9475 153.049 87.6692 160.987H23.2828V160.986ZM108.557 160.986C89.4565 160.986 73.9169 143.6 73.9169 122.231C73.9169 100.861 89.4568 83.4748 108.557 83.4748C127.657 83.4748 143.197 100.861 143.197 122.231C143.197 143.6 127.658 160.986 108.557 160.986Z" />
                                </svg>
                                <h1 className="font-semibold pt-3">Expertise Team</h1>
                                <h1 className="pt-5">
                                    A team of experts experienced in various fields of mental
                                    health
                                </h1>
                            </div>
                        </li>
                        <li>
                            <div className="accessibility rounded-3xl p-10 flex flex-col justify-center items-center w-72 h-80 border-4 border-black hover:text-white ease-in duration-100 hover:bg-gradient-to-l from-green-700 to-green-300 hover:border-white hover:scale-125">
                                <svg
                                    width="144"
                                    height="132"
                                    viewBox="0 0 108 105"
                                    fill="currentColor"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M105.891 14.9294C107.055 14.9294 108 13.8182 108 12.4479V2.48149C108 1.11096 107.055 0 105.891 0H2.10938C0.944367 0 0 1.11096 0 2.48149V12.4479C0 13.8182 0.944367 14.9294 2.10938 14.9294H8.47188V55.1288C4.82245 56.2343 2.11802 60.1384 2.11802 64.7719C2.11802 69.4053 4.82245 73.3094 8.47188 74.4149V84.7149H8.4375C3.78506 84.7149 0 89.1676 0 94.6408V102.146C0 103.516 0.944367 104.628 2.10938 104.628H105.891C107.055 104.628 108 103.516 108 102.146V94.6408C108 89.1676 104.215 84.7149 99.5625 84.7149H99.5281V14.9294H105.891ZM4.21875 4.96298H103.781V9.96641C98.9432 9.96641 13.0045 9.96641 4.21875 9.96641V4.96298ZM82.5928 59.7786C84.9333 59.7786 86.8375 62.0184 86.8375 64.7719C86.8375 67.5253 84.9333 69.7651 82.5928 69.7651C80.2522 69.7651 78.3483 67.5253 78.3483 64.7719C78.3483 62.0184 80.2522 59.7786 82.5928 59.7786ZM80.4834 55.1288C78.8143 55.6343 77.3445 56.7271 76.2389 58.2058C75.1334 56.7271 73.6634 55.6343 71.9942 55.1288V14.9294H80.4834V55.1288ZM31.7611 59.7786C34.1016 59.7786 36.0058 62.0184 36.0058 64.7719C36.0058 67.5253 34.1016 69.7651 31.7611 69.7651C29.4205 69.7651 27.5166 67.5253 27.5166 64.7719C27.5166 62.0184 29.4207 59.7786 31.7611 59.7786ZM33.8704 55.1288V14.9294H42.3596V55.1288C40.6905 55.6343 39.2207 56.7271 38.1151 58.2058C37.0096 56.7271 35.5398 55.6343 33.8704 55.1288ZM44.469 59.7786C46.8096 59.7786 48.7135 62.0184 48.7135 64.7719C48.7135 67.5253 46.8096 69.7651 44.469 69.7651C42.1284 69.7651 40.2245 67.5253 40.2245 64.7719C40.2245 62.0184 42.1286 59.7786 44.469 59.7786ZM46.5784 55.1288V14.9294H55.0676V55.1288C53.3982 55.6343 51.9284 56.7271 50.8229 58.2058C49.7175 56.7271 48.2477 55.6343 46.5784 55.1288ZM57.1769 59.7786C59.5175 59.7786 61.4214 62.0184 61.4214 64.7719C61.4214 67.5253 59.5175 69.7651 57.1769 69.7651C54.8364 69.7651 52.9322 67.5253 52.9322 64.7719C52.9322 62.0184 54.8366 59.7786 57.1769 59.7786ZM59.2863 55.1288V14.9294H67.7753V55.1288C66.1061 55.6343 64.6363 56.7271 63.5308 58.2058C62.4255 56.7271 60.9557 55.6343 59.2863 55.1288ZM69.8849 59.7786C72.2254 59.7786 74.1296 62.0184 74.1296 64.7719C74.1296 67.5253 72.2254 69.7651 69.8849 69.7651C67.5443 69.7651 65.6404 67.5253 65.6404 64.7719C65.6404 62.0184 67.5443 59.7786 69.8849 59.7786ZM19.3752 14.9294L12.6906 40.6771V14.9294H19.3752ZM6.33677 64.7719C6.33677 62.0211 8.23711 59.7833 10.5745 59.7789C13.0526 59.8091 14.826 62.138 14.826 64.7719C14.826 67.5253 12.9218 69.7651 10.5813 69.7651C8.2407 69.7651 6.33677 67.5253 6.33677 64.7719ZM103.781 94.6408V99.6646H4.21875V94.6408C4.21875 91.9042 6.11128 89.6778 8.4375 89.6778H99.5625C101.889 89.6778 103.781 91.9042 103.781 94.6408ZM95.3094 84.7149H12.6906V74.4149C16.3401 73.3094 19.0447 69.4051 19.0447 64.7719C19.0447 60.3982 16.6337 56.6767 13.2939 55.3432L23.7862 14.9291H29.6517V55.1285C26.0023 56.234 23.2978 60.1382 23.2978 64.7716C23.2978 70.2614 27.0945 74.7279 31.7611 74.7279C34.2906 74.7279 36.5629 73.4139 38.1151 71.3376C41.492 75.8544 47.4411 75.8611 50.8229 71.3376C54.2067 75.8636 60.1558 75.8522 63.5308 71.3376C66.9144 75.8636 72.8637 75.852 76.2387 71.3376C77.7908 73.4139 80.0632 74.7279 82.5926 74.7279C87.2594 74.7279 91.056 70.2614 91.056 64.7716C91.056 60.1382 88.3514 56.2338 84.702 55.1285V14.9294H95.3092L95.3094 84.7149Z" />
                                </svg>
                                <h1 className="font-semibold pt-3">Accessibility</h1>
                                <h1 className="pt-5">
                                    Provide wider access to mental health services
                                </h1>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            {/* About Us */}
            <div id="aboutUs" className="aboutUS p-10 pt-20 flex">
                <div className="imgAboutUs">
                    <img src={aboutUs} />
                </div>
                <div className="textAboutUs">
                    <h1 className="font-semibold text-xl">About Us</h1>
                    <h1 className="pt-10 text-4xl w-96">
                        Discover the Faces Behind Our Mental Health Consultancy
                    </h1>
                    <h1 className="pt-16 w-96">
                        Meet experts committed to supporting your mental health. With
                        diverse backgrounds and expertise, we are ready to help you. Every
                        individual is unique, and so is our approach.
                    </h1>
                    <Button className="bg-green-700 mt-12 hover:bg-green-900 text-white font-semibold px-10 py-5 rounded-full">
                        See Detail
                    </Button>
                </div>
            </div>
            {/* Services */}
            <div id="services" className="services p-10 pt-24 text-center">
                <h1 className="font-semibold text-xl">Services</h1>
                <h1 className="pt-8 font-semibold text-4xl pr-40 pl-40">
                    Empowering Minds Our Mental Health Consulting Services
                </h1>
                <div className="listServices pt-20">
                    <ul className="flex justify-between">
                        <li>
                            <div className="tesKesehatan w-80 h-64 pt-10 p-5 border-2 border-black rounded-3xl">
                                <h1 className="font-semibold">Tes Kesehatan Mental</h1>
                                <h1 className="pt-5">
                                    Ingin mengetahui kondisi mentalmu saat ini? Yuk, lakukan tes
                                    singkat ini!
                                </h1>
                                <Button className="bg-green-700 mt-12 hover:bg-green-900 text-white font-semibold px-10 py-5 rounded-full">
                                    See Detail
                                </Button>
                            </div>
                        </li>
                        <li>
                            <div className="konseling w-80 h-64 pt-10 p-5 border-2 border-black rounded-3xl">
                                <h1 className="font-semibold">Konseling Mental</h1>
                                <h1 className="pt-5">
                                    Butuh bantuan untuk mengatasi masalah emosional atau
                                    psikologis? Konseling bisa menjadi solusinya.
                                </h1>
                                <Button className="bg-green-700 mt-6 hover:bg-green-900 text-white font-semibold px-10 py-5 rounded-full">
                                    See Detail
                                </Button>
                            </div>
                        </li>
                        <li>
                            <div className="janjiDokter w-80 h-64 pt-10 p-5 border-2 border-black rounded-3xl">
                                <h1 className="font-semibold">Janji Dokter</h1>
                                <h1 className="pt-5">
                                    Ingin berkonsultasi mengenai keluhan kesehatan Anda? Kunjungi
                                    dokter sekarang.
                                </h1>
                                <Button className="bg-green-700 mt-6 hover:bg-green-900 text-white font-semibold px-10 py-5 rounded-full">
                                    See Detail
                                </Button>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            {/* Artikel */}
            <div id="artikel" className="artikel pt-20">
                <h1 className="font-semibold text-4xl text-center">
                    Baca Artikel Baru
                </h1>
                <div className="listArtikel pt-10">
                    <ul className="flex justify-evenly gap-2">
                        <li>
                            <div className="artikel1 w-[300px] h-[350px] border-2 border-black rounded-lg">
                                <img src={artikel1} />
                                <h1 className="font-semibold text-base pr-3 pl-3 mt-3">
                                    Gangguan Kesehatan Mental: Penyebab & Cara Mengatasinya
                                </h1>
                                <h1 className="text-xs mt-3 pr-3 pl-3">
                                    Kesehatan mental merupakan suatu kondisi medis yang berkaitan
                                    dengan aspek psikologis dan emosional seseorang. Ini
                                    mencerminkan...
                                </h1>
                            </div>
                        </li>
                        <li>
                            <div className="artikel2 w-[300px] h-[350px] border-2 border-black rounded-lg">
                                <img src={artikel2} />
                                <h1 className="font-semibold text-base mt-3 pr-3 pl-3">
                                    8 Obat Penenang yang Aman Dikonsumsi Sesuai Anjuran Dokter
                                </h1>
                                <h1 className="text-xs mt-3 pr-3 pl-3">
                                    Ada beberapa pilihan obat penenang yang aman untuk dikonsumsi.
                                    Namun, penting untuk memperhatikan aturan pakainya sesuai...
                                </h1>
                            </div>
                        </li>
                        <li>
                            <div className="artikel3 w-[300px] h-[350px] border-2 border-black rounded-lg">
                                <img src={artikel3} />
                                <h1 className="font-semibold text-base mt-3 pr-3 pl-3">
                                    Macam-Macam Penyakit Mental dan Gejala Umumnya
                                </h1>
                                <h1 className="text-xs mt-3 pr-3 pl-3">
                                    Gangguan mental merupakan sebuah kondisi yang nyata dan bisa
                                    dialami oleh siapa saja. Terdapat macam-macam penyakit
                                    mental...
                                </h1>
                            </div>
                        </li>
                        <li>
                            <div className="artikel4 w-[300px] h-[350px] border-2 border-black rounded-lg">
                                <img src={artikel4} />
                                <h1 className="font-semibold text-base mt-3 pr-3 pl-3">
                                    Apa Itu Anxiety Disorder? Kenali Gejala dan Pengobatannya
                                </h1>
                                <h1 className="text-xs mt-3 pr-3 pl-3">
                                    Anxiety disorder adalah gangguan mental yang menyebabkan rasa
                                    cemas dan takut berlebih. Hal tersebut membuat Anda menjadi
                                    tidak...
                                </h1>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            {/* Footer */}
            <footer className="pt-60">
                <div className="footer bg-gradient-to-r p-20 from-green-700 to-green-300">
                    <ul className="flex justify-between">
                        <li>
                            <div className="logoFooter flex gap-3">
                                <img src={logoFooter} />
                                <h1 className="text-white font-semibold text-3xl mt-1">
                                    MindTrack
                                </h1>
                            </div>
                        </li>
                        <li>
                            <div className="textService mt-2">
                                <ul>
                                    <li>
                                        <h1 className="text-white font-bold text-lg underline pb-5">
                                            Service
                                        </h1>
                                    </li>
                                    <li>
                                        <h1 className="text-white underline">
                                            Tes Kesehatan Mental
                                        </h1>
                                    </li>
                                    <li>
                                        <h1 className="text-white underline">Konseling Mental</h1>
                                    </li>
                                    <li>
                                        <h1 className="text-white underline">Janji Dokter</h1>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <li>
                            <div className="textContact mt-2">
                                <ul>
                                    <li>
                                        <h1 className="text-white font-bold text-lg underline pb-5">
                                            Contact
                                        </h1>
                                    </li>
                                    <li className="flex gap-4">
                                        <img src={call} />
                                        <h1 className="text-white underline">
                                            +62 823-3133-3221
                                        </h1>
                                    </li>
                                    <li className="flex gap-4">
                                        <img src={message} />
                                        <h1 className="text-white underline">mindtrack@domain.com</h1>
                                    </li>
                                    <li className="flex gap-4">
                                        <img src={location} />
                                        <h1 className="text-white underline">Politeknik Elektronika Negeri Surabaya</h1>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <li>
                            <div className="textLinks mt-2">
                                <ul>
                                    <li>
                                        <h1 className="text-white font-bold text-lg underline pb-5">
                                            Links
                                        </h1>
                                    </li>
                                    <li>
                                        <h1 className="text-white underline">
                                            Kebijakan Privasi
                                        </h1>
                                    </li>
                                    <li>
                                        <h1 className="text-white underline">Ketentuan Penggunaan</h1>
                                    </li>
                                </ul>
                            </div>
                        </li>
                    </ul>
                    <hr className="mt-20 border-2" />
                    <h1 className="text-white text-center mt-10 underline">Copyright 2024 @mindtrack all right reserved</h1>
                </div>
            </footer>
        </div>
    );
};

export default Dashboard;
