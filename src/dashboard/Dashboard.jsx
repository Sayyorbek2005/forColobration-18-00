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
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Dashboard() {
  const [openMenu, setOpenMenu] = useState(false);

  const [showStudentForm, setShowStudentForm] = useState(false);
  const [showGroupForm, setShowGroupForm] = useState(false);

  const [groups, setGroups] = useState([]);
  const [students, setStudents] = useState([]);
  // const [selectedGroup, setSelectedGroup] = useState(null);
  const [selectedGroup, setSelectedGroup] = useState(null);

  const [groupForm, setGroupForm] = useState({
    kurs: "",
    oqituvchi: "",
    narx: "",
    vaqt: "",
    xona: "",
    markaz: "",
  });

  const [studentForm, setStudentForm] = useState({
    ism: "",
    familiya: "",
    groupId: "",
    telefon: "",
    manzil: "",
    tolov: false,
  });

  useEffect(() => {
    getGroups();
    getStudents();
  }, []);

  const getGroups = async () => {
    try {
      const res = await fetch("https://692eb13d91e00bafccd4de97.mockapi.io/groups");
      const data = await res.json();
      setGroups(data);
    } catch (err) {
      console.log(err);
    }
  };

  const getStudents = async () => {
    try {
      const res = await fetch("https://6a2d63d92edd4cb330d11ac2.mockapi.io/students");
      const data = await res.json();
      setStudents(data);
    } catch (err) {
      console.log(err);
    }
  };

  const addGroup = async () => {
    if (
      !groupForm.kurs.trim() ||
      !groupForm.oqituvchi.trim() ||
      !groupForm.narx.trim() ||
      !groupForm.vaqt.trim() ||
      !groupForm.xona.trim() ||
      !groupForm.markaz.trim()
    ) {
      toast.error("Barcha maydonlarni to'ldiring!");
      return;
    }

    const newGroup = {
      id: Date.now(),
      ...groupForm,
    };

    try {
      const res = await fetch(
        "https://692eb13d91e00bafccd4de97.mockapi.io/groups",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newGroup),
        },
      );

      const data = await res.json();

      setGroups((prev) => [...prev, data]);

      setGroupForm({
        kurs: "",
        oqituvchi: "",
        narx: "",
        vaqt: "",
        xona: "",
        markaz: "",
      });

      toast.success("Guruh qo'shildi ");

      setShowGroupForm(false);
    } catch (err) {
      console.log(err);
      toast.error("Xatolik yuz berdi ");
    }
  };

  const addStudent = async () => {
    if (
      !studentForm.ism.trim() ||
      !studentForm.familiya.trim() ||
      !studentForm.groupId ||
      !studentForm.telefon.trim() ||
      !studentForm.manzil.trim()
    ) {
      toast.error("Barcha maydonlarni to'ldiring!");
      return;
    }

    const newStudent = {
      id: Date.now(),
      ...studentForm,
    };

    try {
      const res = await fetch(
        "https://6a2d63d92edd4cb330d11ac2.mockapi.io/students",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newStudent),
        },
      );

      const data = await res.json();

      setStudents((prev) => [...prev, data]);

      setStudentForm({
        ism: "",
        familiya: "",
        groupId: "",
        telefon: "",
        manzil: "",
        tolov: false,
      });

      toast.success("Talaba qo'shildi");

      setShowStudentForm(false);
    } catch (err) {
      toast.error("Xatolik yuz berdi");
    }
  };

  return (
    <Container>
      <Sidebar>
        <Profile>
          <Avatar>👤</Avatar>

          <Name>Xusan</Name>

          <Email>xusan0083@gmail.com</Email>
        </Profile>

        <Menu>
          {groups.map((group) => (
            <MenuItem key={group.id} onClick={() => setSelectedGroup(group)}>
              {group.kurs}
            </MenuItem>
          ))}
        </Menu>
      </Sidebar>

      <Main>
        <Header>
          <h2>Dashboard User</h2>
 
            

          <MenuWrapper>
            <Button onClick={() => setOpenMenu(!openMenu)}>☰</Button>

            <Dropdown open={openMenu}>
              <DropdownItem
                onClick={() => {
                  setShowGroupForm(true);
                  setShowStudentForm(false);
                  setOpenMenu(false);
                }}
              >
                ➕ Guruh qo'shish
              </DropdownItem>

              <DropdownItem
                onClick={() => {
                  setShowStudentForm(true);
                  setShowGroupForm(false);
                  setOpenMenu(false);
                }}
              >
                👨‍🎓 Talaba qo'shish
              </DropdownItem>
            </Dropdown>
          </MenuWrapper>
        </Header>

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
            <h2>📚 Guruh qo'shish</h2>

            <Input
              placeholder="Kurs"
              value={groupForm.kurs}
              onChange={(e) =>
                setGroupForm({
                  ...groupForm,
                  kurs: e.target.value,
                })
              }
            />

            <Input
              placeholder="O'qituvchi"
              value={groupForm.oqituvchi}
              onChange={(e) =>
                setGroupForm({
                  ...groupForm,
                  oqituvchi: e.target.value,
                })
              }
            />

            <Input
              placeholder="Narx"
              value={groupForm.narx}
              onChange={(e) =>
                setGroupForm({
                  ...groupForm,
                  narx: e.target.value,
                })
              }
            />

            <Input
              placeholder="Vaqt"
              value={groupForm.vaqt}
              onChange={(e) =>
                setGroupForm({
                  ...groupForm,
                  vaqt: e.target.value,
                })
              }
            />

            <Input
              placeholder="Xona"
              value={groupForm.xona}
              onChange={(e) =>
                setGroupForm({
                  ...groupForm,
                  xona: e.target.value,
                })
              }
            />

            <Input
              placeholder="Markaz"
              value={groupForm.markaz}
              onChange={(e) =>
                setGroupForm({
                  ...groupForm,
                  markaz: e.target.value,
                })
              }
            />

            <Button onClick={addGroup}>Guruh qo'shish</Button>
          </ChartBox>
        )}

        {showStudentForm && (
          <ChartBox>
            <h2>👨‍🎓 Talaba qo'shish</h2>

            <Input
              placeholder="Ism"
              value={studentForm.ism}
              onChange={(e) =>
                setStudentForm({
                  ...studentForm,
                  ism: e.target.value,
                })
              }
            />

            <Input
              placeholder="Familiya"
              value={studentForm.familiya}
              onChange={(e) =>
                setStudentForm({
                  ...studentForm,
                  familiya: e.target.value,
                })
              }
            />

            <Select
              value={studentForm.groupId}
              onChange={(e) =>
                setStudentForm({
                  ...studentForm,
                  groupId: Number(e.target.value),
                })
              }
            >
              <option value="">Guruh tanlang</option>
              {groups.map((group) => (
                <option key={group.id} value={group.id}>
                  {group.kurs}
                </option>
              ))}
            </Select>

            <Input
              placeholder="Telefon"
              value={studentForm.telefon}
              onChange={(e) =>
                setStudentForm({
                  ...studentForm,
                  telefon: e.target.value,
                })
              }
            />

            <Input
              placeholder="Manzil"
              value={studentForm.manzil}
              onChange={(e) =>
                setStudentForm({
                  ...studentForm,
                  manzil: e.target.value,
                })
              }
            />

            <Button onClick={addStudent}>Talaba qo'shish</Button>
          </ChartBox>
        )}

        <BottomSection>
          <ChartBox>
            <h3>Analytics</h3>
          </ChartBox>

          <ProgressCard>
            <h2>45%</h2>

            <p>Faol talabalar</p>

            <Button>Batafsil</Button>
          </ProgressCard>
        </BottomSection>
      </Main>
    </Container>
  );
}

export default Dashboard;
