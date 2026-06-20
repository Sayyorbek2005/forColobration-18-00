import React, { useEffect, useState } from "react";
import {
  Container,
  Sidebar,
  Profile,
  Avatar,
  Name,
  Email,
  Menu,
  MenuItem,
  Main,
  Header,
  Cards,
  Card,
  CardTitle,
  ChartBox,
  BottomSection,
  ProgressCard,
  Button,
  DropdownItem,
  Dropdown,
  MenuWrapper,
  Input,
  Select,
} from "./Dashboard.Styled";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// React Icons kutubxonasidan kerakli ikonkalar (FaHome qo'shildi)
import { 
  FaUser, 
  FaBars, 
  FaFolderPlus, 
  FaUserPlus, 
  FaBookOpen, 
  FaGraduationCap, 
  FaCheckCircle,
  FaClipboardList,
  FaPenSquare,
  FaUsers,
  FaHome
} from "react-icons/fa";

function Dashboard() {
  const [openMenu, setOpenMenu] = useState(false);
  const [showStudentForm, setShowStudentForm] = useState(false);
  const [showGroupForm, setShowGroupForm] = useState(false);

  // Amaliyot va Test boshqaruvi uchun yangi state (Nav menyu uchun)
  // 'dashboard', 'amaliyot', 'test', 'userlar' qiymatlarini qabul qiladi
  const [activeTab, setActiveTab] = useState('dashboard');

  const [groups, setGroups] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);

  // Global foydalanuvchilar ro'yxati (Ikkinchi koddagi ma'lumotlar)
  const [users, setUsers] = useState([
    { id: 1, fullname: "Aliyev Vali", kurs: "Frontend", verselLink: "https://project1.vercel.app", testNatija: "25/30", ball: 85 },
    { id: 2, fullname: "Olimova Malika", kurs: "Node.js", verselLink: "https://project2.vercel.app", testNatija: "28/30", ball: 92 },
    { id: 3, fullname: "Karimov Umar", kurs: "React Foundation", verselLink: "https://project3.vercel.app", testNatija: "22/30", ball: 78 }
  ]);

  // Formlar uchun statelar
  const [groupForm, setGroupForm] = useState({ kurs: "", oqituvchi: "", narx: "", vaqt: "", xona: "", markaz: "" });
  const [studentForm, setStudentForm] = useState({ ism: "", familiya: "", kurs: "", telefon: "", manzil: "", groupId: "", tolov: false });
  const [amaliyotForm, setAmaliyotForm] = useState({ fullname: '', link: '', kurs: 'React guruh' });
  const [testForm, setTestForm] = useState({ fullname: '', belgilanganJavoblar: {}, isSubmited: false });

  useEffect(() => {
    getGroups();
    getStudents();
  }, []);

  const getGroups = async () => {
    try {
      const res = await fetch("http://localhost:3000/groups");
      const data = await res.json();
      setGroups(data);
    } catch (err) {
      console.log(err);
    }
  };

  const getStudents = async () => {
    try {
      const res = await fetch("http://localhost:3000/students");
      const data = await res.json();
      setStudents(data);
    } catch (err) {
      console.log(err);
    }
  };

  // Guruh qo'shish funksiyasi
  const addGroup = async () => {
    if (!groupForm.kurs.trim() || !groupForm.oqituvchi.trim() || !groupForm.narx.trim() || !groupForm.vaqt.trim() || !groupForm.xona.trim() || !groupForm.markaz.trim()) {
      toast.error("Barcha maydonlarni to'ldiring!");
      return;
    }

    const newGroup = { id: Date.now(), ...groupForm };

    try {
      const res = await fetch("https://692eb13d91e00bafccd4de97.mockapi.io/groups", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newGroup),
      });

      const data = await res.json();
      setGroups((prev) => [...prev, data]);
      setGroupForm({ kurs: "", oqituvchi: "", narx: "", vaqt: "", xona: "", markaz: "" });
      
      toast.success(
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          Guruh qo'shildi <FaCheckCircle color="#fff" />
        </div>
      );
      setShowGroupForm(false);
    } catch (err) {
      toast.error("Xatolik yuz berdi ❌");
    }
  };

  // Talaba qo'shish funksiyasi
  const addStudent = async () => {
    if (!studentForm.ism.trim() || !studentForm.familiya.trim() || !studentForm.telefon.trim() || !studentForm.manzil.trim()) {
      toast.error("Barcha maydonlarni to'ldiring!");
      return;
    }

    const newStudent = { id: Date.now(), ...studentForm };

    try {
      const res = await fetch("https://6a2d63d92edd4cb330d11ac2.mockapi.io/students", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newStudent),
      });

      const data = await res.json();
      setStudents((prev) => [...prev, data]);
      setStudentForm({ ism: "", familiya: "", kurs: "", telefon: "", manzil: "", groupId: "", tolov: false });
      
      toast.success("Talaba qo'shildi");
      setShowStudentForm(false);
    } catch (err) {
      toast.error("Xatolik yuz berdi");
    }
  };

  // 1. Amaliyot topshirish funksiyasi
  const handleAmaliyotSubmit = (e) => {
    e.preventDefault();
    if (!amaliyotForm.fullname || !amaliyotForm.link) {
      return toast.error("Barcha maydonlarni to'ldiring!");
    }

    console.log("Telegram Botga yuborildi: ", amaliyotForm);
    
    const newUser = {
      id: Date.now(),
      fullname: amaliyotForm.fullname,
      kurs: amaliyotForm.kurs,
      verselLink: amaliyotForm.link,
      testNatija: "Topshirilmagan",
      ball: 0
    };

    setUsers([newUser, ...users]);
    toast.success("Amaliyot muvaffaqiyatli topshirildi va Telegram botga yuborildi!");
    setAmaliyotForm({ fullname: '', link: '', kurs: 'React guruh' });
    setActiveTab('userlar'); // Foydalanuvchini avtomatik userlar oynasiga o'tkazish
  };

  // 2. Testni yakunlash funksiyasi
  const handleTestSubmit = (e) => {
    e.preventDefault();
    if (!testForm.fullname) {
      return toast.error("Ismingizni kiriting!");
    }

    const togriJavoblarSoni = Object.keys(testForm.belgilanganJavoblar).length;
    const umumiyBall = togriJavoblarSoni * 10; 

    console.log("Telegram Botga test natijasi ketdi:", testForm.fullname, umumiyBall);

    const newUserWithTest = {
      id: Date.now(),
      fullname: testForm.fullname,
      kurs: "Onlayn Test",
      verselLink: "Topshirilmagan",
      testNatija: `${togriJavoblarSoni}/30`,
      ball: umumiyBall
    };

    setUsers([newUserWithTest, ...users]);
    toast.success(`Test tugadi! Natija: ${togriJavoblarSoni}/30 botga va foydalanuvchilar ro'yxatiga yuborildi.`);
    setTestForm({ fullname: '', belgilanganJavoblar: {}, isSubmited: true });
    setActiveTab('userlar');
  };

  return (
    <Container>
      <ToastContainer />
      <Sidebar>
        <Profile>
          <Avatar onClick={() => setActiveTab('dashboard')} style={{ cursor: 'pointer' }}>
            <FaUser size={20} />
          </Avatar>
          <Name style={{ cursor: 'pointer' }} onClick={() => setActiveTab('dashboard')}>Xusan</Name>
          <Email>xusan0083@gmail.com</Email>
        </Profile>

        <Menu>
          {/* Yangilangan Asosiy Dashboard elementi */}
          <MenuItem 
            onClick={() => setActiveTab('dashboard')} 
            style={{
              fontWeight: activeTab === 'dashboard' ? 'bold' : 'normal',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <FaHome /> Asosiy Dashboard
          </MenuItem>
          
          {groups.map((group) => (
            <MenuItem 
              key={group.id} 
              onClick={() => { setSelectedGroup(group); setActiveTab('dashboard'); }}
              style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
            >
              <FaBookOpen size={14} /> {group.kurs}
            </MenuItem>
          ))}
        </Menu>
      </Sidebar>

      <Main>
        <Header>
          <div style={{ width:"90%", display: "flex",  alignItems: "center", gap: "20px" }}>
            
            {/* AMALIYOT, TEST va USERLAR uchun Nav-Menyu tugmalari */}
            <div style={{ width:"90%", display: "flex", alignItems: "center",gap: "10px", marginLeft: "10px" }}>
            <h2 style={{ margin: 0, cursor: 'pointer' }} onClick={() => setActiveTab('dashboard')}>Dashboard User</h2>
              <Button 
                onClick={() => setActiveTab('amaliyot')}
                style={{ 
                  backgroundColor: activeTab === 'amaliyot' ? '#007bff' : '#f0f2f5',
                  color: activeTab === 'amaliyot' ? '#fff' : '#333',
                  padding: '6px 12px', fontSize: '14px', borderRadius: '6px', display: 'flex', alignItems: 'center', gap: '6px'
                }}
              >
                <FaClipboardList /> Amaliyot
              </Button>
              <Button 
                onClick={() => setActiveTab('test')}
                style={{ 
                  backgroundColor: activeTab === 'test' ? '#007bff' : '#f0f2f5',
                  color: activeTab === 'test' ? '#fff' : '#333',
                  padding: '6px 12px', fontSize: '14px', borderRadius: '6px', display: 'flex', alignItems: 'center', gap: '6px'
                }}
              >
                <FaPenSquare /> Testlar
              </Button>
              <Button 
                onClick={() => setActiveTab('userlar')}
                style={{ 
                  backgroundColor: activeTab === 'userlar' ? '#007bff' : '#f0f2f5',
                  color: activeTab === 'userlar' ? '#fff' : '#333',
                  padding: '6px 12px', fontSize: '14px', borderRadius: '6px', display: 'flex', alignItems: 'center', gap: '6px'
                }}
              >
                <FaUsers /> Foydalanuvchilar
              </Button>
            </div>
          </div>

          <MenuWrapper>
            <Button onClick={() => setOpenMenu(!openMenu)}>
              <FaBars />
            </Button>

            <Dropdown open={openMenu}>
              <DropdownItem onClick={() => { setShowGroupForm(true); setShowStudentForm(false); setOpenMenu(false); setActiveTab('dashboard'); }} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <FaFolderPlus /> Guruh qo'shish
              </DropdownItem>
              <DropdownItem onClick={() => { setShowStudentForm(true); setShowGroupForm(false); setOpenMenu(false); setActiveTab('dashboard'); }} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <FaUserPlus /> Talaba qo'shish
              </DropdownItem>
            </Dropdown>
          </MenuWrapper>
        </Header>

        {/* 1. ASOSIY DASHBOARD KONTENTI */}
        {activeTab === 'dashboard' && (
          <>
            <Cards>
              <Card active={true}>
                <CardTitle>Talabalar soni</CardTitle>
                <h2>{students.length}</h2>
              </Card>
              <Card>
                <CardTitle>To'lov qilganlar</CardTitle>
                <h2>{students.filter((item) => item.tolov).length}</h2>
              </Card>
              <Card>
                <CardTitle>Qarzdorlar</CardTitle>
                <h2>{students.filter((item) => !item.tolov).length}</h2>
              </Card>
              <Card>
                <CardTitle>Guruhlar soni</CardTitle>
                <h2>{groups.length}</h2>
              </Card>
            </Cards>

            {showGroupForm && (
              <ChartBox>
                <h2 style={{ display: "flex", alignItems: "center", gap: "10px" }}><FaBookOpen /> Guruh qo'shish</h2>
                <Input placeholder="Kurs" value={groupForm.kurs} onChange={(e) => setGroupForm({ ...groupForm, kurs: e.target.value })} />
                <Input placeholder="O'qituvchi" value={groupForm.oqituvchi} onChange={(e) => setGroupForm({ ...groupForm, oqituvchi: e.target.value })} />
                <Input placeholder="Narx" value={groupForm.narx} onChange={(e) => setGroupForm({ ...groupForm, narx: e.target.value })} />
                <Input placeholder="Vaqt" value={groupForm.vaqt} onChange={(e) => setGroupForm({ ...groupForm, vaqt: e.target.value })} />
                <Input placeholder="Xona" value={groupForm.xona} onChange={(e) => setGroupForm({ ...groupForm, xona: e.target.value })} />
                <Input placeholder="Markaz" value={groupForm.markaz} onChange={(e) => setGroupForm({ ...groupForm, markaz: e.target.value })} />
                <Button onClick={addGroup}>Guruh qo'shish</Button>
              </ChartBox>
            )}

            {showStudentForm && (
              <ChartBox>
                <h2 style={{ display: "flex", alignItems: "center", gap: "10px" }}><FaGraduationCap /> Talaba qo'shish</h2>
                <Input placeholder="Ism" value={studentForm.ism} onChange={(e) => setStudentForm({ ...studentForm, ism: e.target.value })} />
                <Input placeholder="Familiya" value={studentForm.familiya} onChange={(e) => setStudentForm({ ...studentForm, familiya: e.target.value })} />
                <Select value={studentForm.groupId} onChange={(e) => setStudentForm({ ...studentForm, groupId: Number(e.target.value) })}>
                  <option value="">Guruh tanlang</option>
                  {groups.map((group) => (
                    <option key={group.id} value={group.id}>{group.kurs}</option>
                  ))}
                </Select>
                <Input placeholder="Telefon" value={studentForm.telefon} onChange={(e) => setStudentForm({ ...studentForm, telefon: e.target.value })} />
                <Input placeholder="Manzil" value={studentForm.manzil} onChange={(e) => setStudentForm({ ...studentForm, manzil: e.target.value })} />
                <Button onClick={addStudent}>Talaba qo'shish</Button>
              </ChartBox>
            )}

            <BottomSection>
              <ChartBox><h3>Analytics</h3></ChartBox>
              <ProgressCard>
                <h2>45%</h2>
                <p>Faol talabalar</p>
                <Button>Batafsil</Button>
              </ProgressCard>
            </BottomSection>
          </>
        )}

        {/* 2. INTEGRATSIYA QILINGAN AMALIYOT SAHIFASI */}
        {activeTab === 'amaliyot' && (
          <ChartBox>
            <h2><FaClipboardList /> Amaliyot vazifasini topshirish</h2>
            <form onSubmit={handleAmaliyotSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '15px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '5px' }}>To'liq ismingiz (Fullname):</label>
                <Input type="text" placeholder="Ism va familiyangizni kiriting..." value={amaliyotForm.fullname} onChange={(e) => setAmaliyotForm({...amaliyotForm, fullname: e.target.value})} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '5px' }}>Kurs nomi:</label>
                <Input type="text" value={amaliyotForm.kurs} onChange={(e) => setAmaliyotForm({...amaliyotForm, kurs: e.target.value})} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '5px' }}>Vercel loyiha linki:</label>
                <Input type="url" placeholder="https://example.vercel.app" value={amaliyotForm.link} onChange={(e) => setAmaliyotForm({...amaliyotForm, link: e.target.value})} />
              </div>
              <Button type="submit" style={{ marginTop: '10px' }}>Botga va Userlarga yuborish</Button>
            </form>
          </ChartBox>
        )}

        {/* 3. INTEGRATSIYA QILINGAN TEST SAHIFASI */}
        {activeTab === 'test' && (
          <ChartBox>
            <h2><FaPenSquare /> Bilimni sinash uchun testlar (30 ta)</h2>
            <form onSubmit={handleTestSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '15px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '5px' }}>To'liq ismingiz (Fullname):</label>
                <Input type="text" placeholder="Ismingizni kiriting..." value={testForm.fullname} onChange={(e) => setTestForm({...testForm, fullname: e.target.value})} />
              </div>

              <div style={{ background: '#f8f9fa', padding: '15px', borderRadius: '8px' }}>
                <p><strong>1-Savol:</strong> React-da component nima?</p>
                <label><input type="radio" name="q1" onChange={() => setTestForm({...testForm, belgilanganJavoblar: {...testForm.belgilanganJavoblar, q1: true}})} /> Qayta ishlatiladigan kod bo'lagi</label> <br/>
                <label><input type="radio" name="q1" /> Ma'lumotlar bazasi</label>
              </div>

              <div style={{ background: '#f8f9fa', padding: '15px', borderRadius: '8px' }}>
                <p><strong>2-Savol:</strong> useState nima uchun ishlatiladi?</p>
                <label><input type="radio" name="q2" onChange={() => setTestForm({...testForm, belgilanganJavoblar: {...testForm.belgilanganJavoblar, q2: true}})} /> State (holat)ni saqlash uchun</label> <br/>
                <label><input type="radio" name="q2" /> Stil berish uchun</label>
              </div>

              <Button type="submit">Natijani botga va Userlarga yuborish</Button>
            </form>
          </ChartBox>
        )}

        {/* 4. INTEGRATSIYA QILINGAN FOYDALANUVCHILAR SAHIFASI */}
        {activeTab === 'userlar' && (
          <ChartBox>
            <h2><FaUsers /> Foydalanuvchilar Ro'yxati (Natijalar)</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px', marginTop: '20px' }}>
              {users.map((user, index) => (
                <div key={user.id} style={{ border: '1px solid #e0e0e0', padding: '20px', borderRadius: '12px', position: 'relative', background: '#fff', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                  <div style={{ position: 'absolute', top: '10px', right: '10px', background: '#007bff', color: '#fff', borderRadius: '50%', width: '25px', height: '25px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px' }}>
                    {index + 1}
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <p style={{ margin: 0 }}><strong>Ism:</strong> {user.fullname}</p>
                    <p style={{ margin: 0 }}><strong>Kurs:</strong> {user.kurs}</p>
                    <p style={{ margin: 0 }}>
                      <strong>Vercel Link:</strong> {" "}
                      {user.verselLink.startsWith('http') ? (
                        <a href={user.verselLink} target="_blank" rel="noreferrer" style={{ color: '#007bff', textDecoration: 'none' }}>Havola</a>
                      ) : user.verselLink}
                    </p>
                    <p style={{ margin: 0 }}><strong>Test Natijasi:</strong> {user.testNatija}</p>
                    <p style={{ margin: 0 }}><strong>Umumiy Ball:</strong> {user.ball}</p>
                  </div>
                </div>
              ))}
            </div>
          </ChartBox>
        )}




      </Main>
    </Container>
  );
}

export default Dashboard;